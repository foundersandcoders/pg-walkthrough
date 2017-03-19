const fs = require('fs');
require('env2')('./config.env');
/* require('env2')('../config.env'); =
  const env = require('env2');
  env('./config.env'); */

const dbConnection = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (err, res) => {
  if (err) throw err;
  console.log("Super heroes table created with result: ", res);
});
