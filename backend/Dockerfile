FROM php:8.0-fpm-alpine

# Set working directory
WORKDIR /var/www/html

# Copy source code
COPY . .

# Install dependencies
RUN apk add --no-cache \
    $PHPIZE_DEPS \
    openssl-dev \
    libzip-dev \
    zip \
    nginx \
    supervisor \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install opcache \
    && docker-php-ext-install zip \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev \
    && cp .env.example .env \
    && php artisan key:generate \
    && php artisan storage:link \
    && php artisan optimize --force \
    && touch /var/www/html/storage/logs/laravel.log \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage


RUN echo "upload_max_filesize = 32M" >> /usr/local/etc/php/php.ini \
    && echo "post_max_size = 32M" >> /usr/local/etc/php/php.ini

# Remove default nginx configuration file
RUN rm -f /etc/nginx/http.d/default.conf

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/http.d

# Copy supervisord configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Switch to non-root user
# USER www-data

EXPOSE 8080

# Start supervisord
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
