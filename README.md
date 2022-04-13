## Sample REST API with Fastify, TypeScript, Docker, Cloud Run

____________

This is a sample project which purpose is to mimic a bike reservation web service. It is created with [Fastify](https://www.fastify.io/) (web framework for NodeJS) and **TypeScript**.


**Docker** is used for ease of development/deployment and **nodemon** is included for restarting the server each time there is an update to one of the files.

The structure of the projects tries to be modular so it can be easily detached and made as a microservice if needed.

----------------
## Starting the project

Executing `make start-dev` will first build and then start the Docker container with the development NodeJS server and nodemon watching for file chanes. It can be accessed at [http://localhost:8080](http://localhost:8080)

`make start-prod` will start the prod server without rebuilding on file changes.

--------------

## Routes

Once the project is running, the following routes can be accessed:

- `GET` - **/api/bikes/reserve**  - lists all available bikes
- `POST` - **/api/bikes/reserve/** - creates a reservation for a bike
- `GET` - **/api/bikes/reserve/:uuid** - retrieves info about a reservation
- `PUT` - **/api/bikes/reserve/:uuid** - updates reservation
- `DELETE` - **/api/bikes/reserve/:uuid**  deletes reservation


API documentation is generated with with Swagger through Fastify Schemas and is present at: [http://localhost:8080/documentation/](http://localhost:8080/documentation/)

A **Postman** collection file is included in this repository for manual testing.

-----
## CI/CD Deployment

Thanks to the Docker contarization, the project is easily deployed with `make deploy` to [Cloud Run](https://cloud.google.com/run) on GCP.

----------

## Tests

TBD