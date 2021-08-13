#!/bin/bash
{
    docker-compose up --build
}&
sleep 80
echo "CREATE DATABASE postgres ENCODING 'UTF-8';" | docker exec -i postgres psql -U postgres
echo "\l" | docker exec -i postgres psql -U postgres
cd backend
echo "POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=postgres
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true
" > .env
npm run start:dev:db:seed
echo "POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=postgres
PORT=3000
MODE=DEV
RUN_MIGRATIONS=true
" > .env
