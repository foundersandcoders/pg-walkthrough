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
