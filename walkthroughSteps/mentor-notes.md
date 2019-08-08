# Pg Walkthrough Notes

This workshop is intended to be delivered as a code-along. This file contains the mentor notes, and the `step-*` folders in the same directory as this file contain the correct code after the corresponding step. There is no `step-1` folder as step 1 is simply inspecting the files. The students should code in the root directory.

## Getting Started
```sh
git clone https://github.com/foundersandcoders/pg-walkthrough.git
```

## Step 1 – Navigating the initial files
1. Open `src/handler.js`.
    - Here we see the `/static` endpoint reads and serves a file called `static.js`.

2. Open `src/static.js`
    - We see that it contains a data array with two superhero objects.

3. Run `npm start` in command line and navigate to `http://localhost:3000/static` in the browser.
    - Here we see our hardcoded, static, data from `static.js`.
    - Storing/loading dynamic data in files is bad, because file I/O is inefficient and should just be used for server load/config data.

## Step 2 – Setting up the database
1. Create a folder inside the root project: `database`.
    - In the folder `database`, we're going to setup the structure/schema of our database, and hardcoded data.

2. Create a new file: `database/db_build.sql`.
    1. Put a `BEGIN;` at the start of the file and a `COMMIT;` at the end of the file.
        - Clarify that the init queries should be written between these lines (so BEGIN and COMMIT wrap around them).
        - The code inside it is a transaction, so the multiple queries are run as one query/chunk. If an error occurs inside of here, it will rollback the previous commands, preventing messing up the database. Can think of it as SQL error handling

    2. Write `DROP TABLE IF EXISTS superheroes CASCADE;`.
        - This line drops our database each time this file is run.
        > ONLY RUN IT ONCE. This file should never be used in production other than for initialisation. You only want to use this to reset your test database (and can add mock data for it).

         To update your schema, you can create separate update scripts.
        - Cascade will delete tables with relations (that have a REFERENCE defined towards) to `superheroes` too.

    3. Write the schema:
        ```sql
        CREATE TABLE superheroes (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          superPower TEXT NOT NULL,
          weight INTEGER DEFAULT 100
        );
        ```

        - All tables should have an integer `id` that is set as a `PRIMARY KEY` - this is used relate databased together (integer PRIMARY KEY helps with performance)
        - `PRIMARY KEY` also adds `UNIQUE` and `NOT NULL` (primary keys have to be unique).
        - `VARCHAR(LENGTH)`, `INTEGER`, `TEXT` (unlimited length, but larger data usage), etc are SQL data types.
        - `NOT NULL` tells the PostgreSQL to give an error if this is not set.
        - `DEFAULT 100` changes `NULL` values to be `100`.

    4. Initialise some mock/hardcoded data:
        ```sql
        INSERT INTO superheroes (name, superPower, weight) VALUES
          ('Wolverine', 'Regeneration', 300),
          ('Captain Marvel', 'Shoots concussive energy bursts from her hands', 165),
          ('Iron Man', 'None', 425);
        ```

        - Rows separated with commas and each bracket, `(comma-separated values inside here)`, has a row inside it with values




## Step 3 – Connecting and building the database
Pg is a non-blocking PostgreSQL client for node.js that lets you access SQL values as JavaScript data values. Translates data types appropriately to/from JS data types.

Our database is now outlined, but we need a way to connect it

1. Create a new file: `database/db_connection.js`.

2. Install the npm packages `pg` and `env2`: `npm i pg env2`

3. Import `Pool`, `url` and `env2`:
    ```js
    const { Pool } = require('pg');
    const url = require('url');
    require('env2')('./config.env');

    if (!process.env.DB_URL) throw new Error('Environment variable DB_URL must be set');
    ```

    - `{ Pool }` is syntactic sugar (shorten/simplify syntax with abstraction) ([destructuring assignment](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)) that is equivalent to:
        ```js
        const pg = require('pg');
        const Pool = pg.Pool;
        ```

    - [`Connection pooling`](https://en.wikipedia.org/wiki/Connection_pool) is a cache of multiple database connections that are kept open for a timeout period (`idleTimeoutMillis`) and reused when future requests are required, minimising the resource impact of opening/closing connections constantly for write/read heavy apps. Reusing connections minimises latency too. Debug/demo logging `Pool` might be helpful.
    - `url` is a Node module - `url.parse()` will be used later
    - You'll notice that this file requires a `config.env`. We'll set this up later.
    - This is a *gitignored* file with environment variables which are accessed with `process.env.NAME_HERE` and can be set in `config.env` *OR* production environments with `Heroku`
    - The if statement will deliberately crash the script if the _connection information_ variable is missing

4. Parse the URL and authentication info with this code:
    ```js
    const params = url.parse(process.env.DB_URL);
    const [username, password] = params.auth.split(':');
    ```

    - `url.parse(<url string here>)` will split a URL/HREF string into an object of values like `protocol`, `auth`, `hostname`, `port`: [URL split documentation](https://nodejs.org/api/url.html#url_url_strings_and_url_objects)
    - `[username, password]` is a ES6 destructuring assignment that is syntactic sugar for:
        ```js
        const username = params.auth.split(':')[0];
        const password = params.auth.split(':')[1];
        ```

    Where username is index 0 of `params.auth.split(':')` and password is index 1, and so on.

5. Create a [`pg options`](https://node-postgres.com/features/connecting#programmatic) object:
    ```js
    const options = {
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1],
      max: process.env.DB_MAX_CONNECTIONS || 2,
      user: username,
      password,
      ssl: params.hostname !== 'localhost',
    }
    ```

    - Use an appropriate number for `max`. More connections mean more memory is used, and too many can crash the database server. Always return connections to the pool (don't block/freeze query callbacks), or the pool will deplete. More connections mean more queries can be run at once and more redundancy incase connections are blocked/frozen.
    - `ssl` will enable SSL (set to true) if you're not testing on a local machine.
        - TLS / SSL (Secure Sockets Layer) ensures that you are connecting to the database from a secure server, when set to `true`, preventing external networks from being able to read/manipulate database queries with MITM attacks

6. Export the Pool object with options with:
    ```js
    module.exports = new Pool(options);
    ```

    - This exports the Pool constructor/object with the previously set options object, for other files to use this connection pool with `dbConnection.query` where `dbConnection` is the exported `Pool`.

7. Create a file: `database/db_build.js` with this code:
    ```js
    const fs = require('fs');

    const dbConnection = require('./db_connection');

    const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

    dbConnection.query(sql, (err, res) => {
      if (err) throw err;
      console.log("Super heroes table created with result: ", res);
    });
    ```

    - Where `fs` is the Node file system module.
    - `dbConnection` is the previously exported pool object.
    - `sql` is a string of the build script. Think of it as a single query (transaction / collection of queries compiled into one).
    - For getting data, `dbConnection.query` takes the arguments `dbConnection.query(<sql query string goes here>, <callback function with (err, res)>)`
    - For posting data, `dbConnection.query` takes the arguments `dbConnection.query('INSERT INTO table_name (name) VALUES ($1) TO ', [name], <callback function with (err, res)>`
    - This file should only be run separately. NEVER run this in a production after setup, or from other files (unless you know what you're doing).


## Step 4 – Building the database
Now that we have all the correct files, let's get this database up and running.


1. In your command line, run `psql` (Mac/Linux) or `sudo -u postgres psql` (Linux).

2. Create the database by typing `CREATE DATABASE film;` into your Postgres CLI client.

3. Create a user specifically for the database with a password by typing `CREATE USER [the new username] WITH PASSWORD '[the password of the database]'`;
    - The password needs to be in single-quotes, otherwise you get an error
    - For security: In production/public facing server, clear command history and use a password manager with 25+ random characters - and use a firewall
    - A new user is made specifically for the application/database, so if this user is compromised, other databases should remain safe. (security: avoid use of superusers/root + give minimum permissions needed)

4. Change ownership of the database to the new user by typing `GRANT ALL PRIVILEGES ON DATABASE [name of the database] TO [the new username];`.

5. Add a config.env file and add the database's url in this format: `DB_URL = postgres://[username]:[password]@localhost:5432/[database]`
    - Don't use semi-colons or apostrophes for strings in `config.env`, or use alternative JSON notation

6. Now we build the tables we set out in db_build.sql by running our `db_build.js` file by running: `node database/db_build.js` in command line.

7. Try connecting to the database by typing `psql postgres://[username]:[password]@localhost:5432/[database]` and test if everything worked by typing `SELECT * FROM superheroes;`. You should see the data we entered in `db_build.sql` appear.

If you experience permission problems, try running `psql film` then `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO [the new username];`

## Step 5 – connecting to our database from the server
Let's first write a file that gets our information from the database.


1. Create a file `src/dynamic.js`.

2. Import `db_connection.js`:
    ```js
    const dbConnection = require('../database/db_connection');
    ```

3. Write an asynchronous `getData` function that takes and returns a callback.
    ```js
    const getData = (cb) => {
      dbConnection.query('SELECT * FROM superheroes;', (err, res) => {
        if (err) return cb(err);
        console.log('res.rows: ' + res.rows);
        cb(null, res.rows);
      });
    };
    ```

    - If there's an error, return `cb(err)` - the return prevents the success code running.
    - `res.rows` is an array of objects, where the objects are columns and values.

4. Export `getData`:
    ```js
    module.exports = getData;
    ```

5. Go to `handler.js` and import `dynamic.js` as `getData`:
    ```js
    const getData = require('./dynamic');
    ```

6. After the static endpoint if statement : `if(endpoint === 'static'){ ... }`

Still inside the `handler` function.

For the `'dynamic'` endpoint, which we are importing from `('./dynamic)` as `getData`, call getData with a `(error, response)` callback function:

    ```
       getData((err, res) => {
          if (err) return console.log(err);

          let dynamicData = JSON.stringify(res);

          response.writeHead(200, { 'content-type': 'application/json' });

          response.end(dynamicData);
       });
    ```

- `getData` is asynchronous, so `response.end` should be inside it, so it doesn't run before the data comes back from the database request (same as an API request).

7. Navigate to `http://localhost:3000/dynamic` to check it's worked.
