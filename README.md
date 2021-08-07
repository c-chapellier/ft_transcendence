# ft_transcendence
Website to play pong online

<!-- ```bash
docker-compose up –build
``` -->
## Installation

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
```

Then run
```bash
npm install                 # install the dependencies
npm run start:dev:db        # start the datebase
npm run start:dev:db:seed   # add mock data to the db
npm run start:dev           # start the service
```

If all works fine, you can go to http://localhost:3000/api/#/ to see the api documentation and http://localhost:3000/item to see the items in the db

## Frontend

React Typescript

### Initialisation script

```bash
npx create-react-app frontend --template typescript
```

## Backend

NestJS & PostgreSQL

https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f


user -> name level nbrVictory nbrLoss achievements avatar has2FactorAuth friends status(online, offline, in a game) matchHistory blockUsers
channel -> public/private password owner admins users messageHistory
