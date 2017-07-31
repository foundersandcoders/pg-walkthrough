**Author**: [@shiryz](https://github.com/shiryz)  

**Maintainer**: TBC

## Getting Started

Clone this repo: git clone https://github.com/foundersandcoders/pg-walkthrough.git

## Learning Outcomes

**Building a database**
- Creating a build script in a `.sql` file
- Using the DROP and IF EXISTS commands, for use on a `test database`
- What cascade is for and when to use it
- Execute a transaction using BEGIN & COMMIT

**Connecting to a database**
- Connecting to a PostgreSQL server from a node server, including the setup of environment variables (heroku)

**Running queries in Node**
- Understanding what a connection pool is and how to initialise and configure one using pg
- Using pool.query with callbacks, to execute single queries to the database
- Using parameterised queries (to prevent SQL injection)
- Serving the query results to the front end


# Postgres Connection Walkthrough

This exercise is designed to get you familiar with connecting to a database, querying it and viewing that information.
We'll be using the [npm module `pg`](https://www.npmjs.com/package/pg) to connect our node server to a locally-hosted Postgres database.

Inspired by [Matthew Glover](https://github.com/matthewglover) and his awesome [pg-app](https://github.com/matthewglover/pg-app/)
