# demo backend

> ### hapi codebase containing demo solution backend

## Getting started

The database used by this backend is [MYSQL], which is installed via `npm install`, so it's very simple to get started!

Just ensure you've installed a recent version of [nodejs](https://nodejs.org/en/download/) (v8.11+), which comes bundled with the npm package manager referenced in commands below.

##### Development installation

```sh
$ `npm install`
$ change db related credentials in .env file located at server folder (Make sure DB Credentials are valid)
$ `npm install knex -g`
$ `knex migrate:latest`
$ `knex seed:run` for seeding data in database.
$ `npm start`
```

### How to use Knex Migrations?

```sh
$ `knex migrate:latest`
$ `knex migrate:make migration_file_name` It will create a new migration file in migrations folder for creating a table in DB.
$ `knex migrate:rollback` for configure new table in db, we need to rollback our database and then run `knex migrate:latest` again for recreate db structure
$ `knex seed:make userAccess` for creating a new seed file
```

##### Production installation

```sh
$ npm install --production
$ create .env file at server folder
$ NODE_ENV=production npm start
```

# Documentation

1. `When the code is running, API documentation is accessible at localhost:4001.`
