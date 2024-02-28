## About

Simple session authentication built with Remix, Postgres and Prisma.

## Prerequisites

These are the required binaries you need to have installed in order to run the project:

- Node.js version >= 18.0.0
- Docker

## Running locally

- Install dependencies: `pnpm install`
- Copy the example environment variables: `cp .example.env .env`
- Generate a Prisma client: `pnpm exec prisma generate`
- Run the Postgres database and pgAdmin: `docker compose up`
- Start the development Remix server: `pnpm dev`

## Accessing the database

You should have two containers running:

- `remix-session-auth-postgres` for the Postgres database.
- `remix-session-auth-pgadmin` for the pgAdmin database management web interface.

### With pgAdmin (GUI)

You can access the Postgres database through pgAdmin on http://localhost:5050. These are the default login credentials (provided in `.env`):

- Email: `admin@admin.com`
- Password: `1234`

### With `psql` (CLI)

```bash
docker exec -it remix-session-auth-postgres psql -U admin
```
