# ft_transcendence
Website to play pong online

## Backend Installation (NestJS & PostgreSQL)

You must create a `.env` file in the backend directory
```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=postgres
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true


OAUTH_42_CLIENT_ID=da2dcd376acb7bbfa61dc009248e6d317a7e0d29d8908f77ded3016c7dd89f42
OAUTH_42_SECRET=4e588d9794d022839eec7aaac36c8eb44abfef8d0642391cd30b497c598e299a
OAUTH_42_REDIRECT_URL=http://localhost:3001/auth/redirect

JWT_SECRET=topSecret51
JWT_EXPIRATION_TIME=3600
TWO_FACTOR_AUTHENTICATION_APP_NAME=ft_transcendence
```

Then start docker and run

```bash
npm install                 # install the dependencies
npm run start:dev:db        # start the datebase
npm run start:dev:db:seed   # add mock data to the db
npm run start:dev           # start the service
```

If all works fine, you can go to http://localhost:3001/api/#/ to see the api documentation

## Frontend Installation (React Typescript)

Open an other terminal then run

```bash
npm install                 # install the dependencies
yarn start                  # start the app
```

If all works fine, you can go to http://localhost:3000/ to visit the website


## Documentation

[NestJS + Postgresql tutorial](https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f)

## Create a database migration

```bash
npm run typeorm:migration:generate -- migration_name
npm run typeorm:migration:run
```
