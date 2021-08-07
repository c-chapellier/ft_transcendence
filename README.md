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

Then run `npm install`

## Frontend
React Typescript
### Base
```bash
npx create-react-app frontend --template typescript
```

## Backend

https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f

NestJS
### Base
```bash
npm i -g @nestjs/cli
nest new backend
```

### Database
PostgreSQL

user -> name level nbrVictory nbrLoss achievements avatar has2FactorAuth friends status(online, offline, in a game) matchHistory blockUsers
channel -> public/private password owner admins users messageHistory
