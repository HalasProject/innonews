# Web Application with Docker

This web application uses Docker to create a portable development environment. It consists of three Docker containers: frontend, backend, and MySql database.

## Dependencies

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Clone this code repository on your machine:

`git clone https://github.com/halasproject/innonews.git`

2. Navigate to the project directory:
`cd innonews`

3. Build the Docker containers:
`docker-compose build`

4. Start the application:
`docker-compose up`


The application should now be running on http://localhost:3000/ for the frontend and http://localhost:8080/ for the backend.

## Usage

To access the application, open a web browser and navigate to http://localhost:3000/. From here, you can interact with the web application as you normally would.

## License

This project is licensed under the [MIT License](LICENSE).
