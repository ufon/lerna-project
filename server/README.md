# Lerna Back-End

## Description

Streaming platform for education

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment Configuration

Integrated Configuration Module so you can just inject `ConfigService`
and read all environment variables from `.env` file.

## Swagger

RESTful APIs you can describe with already integrated Swagger.
To see all available endpoints visit http://localhost:3000/api/docs

## TypeORM integrated

[TypeORM](http://typeorm.io/) gives you possibility to use next db types:
`mysql`, `postgres`, `mariadb`, `sqlite`, etc. Please look at docs for more details.

## Authentication - JWT

Already preconfigured JWT authentication.
It's suggested to change current password hashing to something more secure.
You can start use already working implementation of `Login` and `Registration`
endpoints, just take a look at [http://localhost:3000/api/docs](http://localhost:3000/api/docs).

## License

NestJS Boilerplate is [MIT licensed](LICENSE).
