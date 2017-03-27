# Postgres Connection Walkthrough

This exercise is designed to get you familiar with connecting to a database, querying it and viewing that information.
We'll be using the NPM module PG to connect our node server to a locally-hosten Postgres database.

Inspired by [Matthew Glover](https://github.com/matthewglover) and his awesome [pg-app](https://github.com/matthewglover/pg-app/blob/master/get_pups.js)

The server is a basic node server, the database is hosted locally.
If you want to build the database:
- create one locally and name it pgworkshop (if you're not familiar with postgres, you can learn it with [DWYL's learn postgresql](https://github.com/dwyl/learn-postgresql) ) .
- run `node database/db_build.js` in your terminal.
- now you have a database and you've created a superheroes table.

Now lets view this data:
- Running `node src/server.js` in your terminal will start the server.
- Navigate to `localhost:3000/static` in your browser and you'll see the data served from `static.js` .
- Navigate to `localhost:3000/dynamic` in your browser and you'll see the data served from `dynamic.js` which queries the database and returns the data from the superheroes table.
