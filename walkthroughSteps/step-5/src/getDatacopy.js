const dbConnection = require("../database/db_connection.js");
const getData = cb => {
  dbConnection.query("SELECT * FROM superheroes", (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getData;
