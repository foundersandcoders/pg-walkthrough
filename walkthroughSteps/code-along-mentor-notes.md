# Pg Walkthrough Notes

## Step 1 – navigating the initial files
1. `npm init`
2. First open src/handler.js. Here we see the `/static` endpoint sends back to our server a file called `static.js`. If we open this file, we see that it contains a data object of two superheroes.
3. run `npm run start` and navigate to `http://localhost:3000/static`. Here we see our hardcoded data from `static.js`.

## Step 2 – setting up the database
1. If we want to serve the data from our database instead, we then need to set up our database.
2. Inside the folder `/database`, create a file called `db_build.js`. Inside this folder, we're going to set up the structure of our database, as well as inserting some initial data into it. In this file:
  - start the file with `BEGIN;`
  - then add `DROP TABLE IF EXISTS superheroes cascade;`. This line gets drops our old database every time this file is run - i.e. every time we build our database.
  - Then we outline the structure of our table. This sets out all the columns we want in our table.
  - We then initialise our table with some data, using `INSERT INTO` and specifying which rows we want to insert data into.
  - we then `COMMIT;` our database.

## Step 3 – connecting and building the database
1. Our database is now outlined, but we need a way to connect it. Inside the `/database` folder, create a file called `db_connection.js`.
  - For this we require the modules `pg` and `env2`, so `npm install --save pg env2` and require them at the top of this file.
  - You'll notice that this file requires a `config.env`. We'll set this up later.
2. We also need a way of building our database. In the `/database` folder, create a file called `db_build.js`.
 - This file builds the database by requiring in our sql file that sets out our schema and using this to query the connection file we just created.

## Step 4 – actually building and hosting the database
1. Now we have all the correct files, let's now get this database up and running.
2. in the terminal run `psql` (mac) or `sudo -u postgres psql` (linux).
3. create the database by typing `CREATE DATABASE superheroes;`
4. Create a superuser with a password by typing `CREATE USER [the new username] WITH SUPERUSER PASSWORD '[the password of the database]'`; (the password needs to be in quotes, otherwise you get an error).
5. Change ownership of the database to the new user by typing `ALTER DATABASE [name of the database] OWNER TO [the new username]`;
6. Add a config.env file and add the database's url in this format: `DB_URL = postgres://[username]:[password]@localhost:5432/[database]`
7. Now we build the tables we set out in db_build.sql by running our `db_build.js` file: `node database/db_build.js`.
7. Connect to the database by typing `psql postgres://[username]:[password]@localhost:5432/[database]` and test if everything worked by typing `SELECT * FROM superheroes;`. You should see the data we entered in db_build.sql appear.
