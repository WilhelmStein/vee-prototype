# Backend

## Information

This backend houses a `docker-compose.yml` file that you can use to run the dockerized backend, a postgres db, as well as a pgadmin instance.

## Installation

```bash
$ pnpm i --frozen-lockfile
```

## Configuration

If you want to run the project locally, copy the contents of `.env.example` into `.env` in the root folder of this project (backend).

If you wish to change the default postgress information, be sure to change them in the `docker-compose.yml` file as well.

By default, the configs are in place for the docker configuration.

## Set up the DB

First, we must set init the db instance through docker-compose.

```
docker compose up --build -d db pgadmin
```

Then, we have to seed the db with some initial data through the following script:

```
pnpm run seed
```

## Execution

If you wish to run the backend locally, you can run:

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

If you however prefer to run the docker execution just run:

```bash
docker compose up --build app
```

## Testing

To run the tests, just run:

```bash
# unit tests
$ pnpm run test

```
