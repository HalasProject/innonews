<p align="center">
   <img src="https://raw.githubusercontent.com/HalasProject/innonews/main/landing_page.png" />
</p>

# Innonews

This web application uses Docker to create a portable development environment. It consists of three Docker containers: frontend, backend, and MySql database.

## Dependencies

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Clone this code repository on your machine:

`git clone https://github.com/halasproject/innonews.git`

2. Navigate to the project directory:

`cd innonews`

4. Copy environneemnt file

`cp backend/.env.example .env`

4. Build the Docker containers:

`docker-compose build`

5. Start the application:

`docker-compose up -d`

6. Install depencenceoes:

`docker-compose exec backend composer install`

7. Generate Key:

`docker-compose exec backend php artisan key:generate`

8. Run migrations:

`docker-compose exec backend php artisan migrate`

9. Set permissions:

`docker-compose exec backend sh -c "php artisan storage:link && touch /var/www/html/storage/logs/laravel.log && chown -R www-data:www-data /var/www/html && chmod -R 775 /var/www/html/bootstrap/cache && chmod -R 775 /var/www/html/storage"`
## Usage

To access the application, open a web browser and navigate to http://localhost:3000. From here, you can interact with the web application as you normally would,
the backend is accesible in  http://localhost:8080.
