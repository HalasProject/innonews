FROM php:8.0-fpm-alpine

# Install dependencies
RUN apk add --no-cache \
    $PHPIZE_DEPS \
    openssl-dev \
    libzip-dev \
    git \
    curl \
    zip \
    unzip \
    nginx \
    supervisor

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql zip opcache

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy project and install dep
WORKDIR /var/www/html

# Update php.ini
RUN echo "upload_max_filesize = 32M" >> /usr/local/etc/php/php.ini
RUN echo "post_max_size = 32M" >> /usr/local/etc/php/php.ini
RUN echo "allow_url_fopen=on" >> /usr/local/etc/php/php.ini

# Remove default nginx configuration file
RUN rm -f /etc/nginx/http.d/default.conf

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/http.d

# Copy supervisord configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose Nginx Server Port
EXPOSE 8080

# Start supervisord
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
