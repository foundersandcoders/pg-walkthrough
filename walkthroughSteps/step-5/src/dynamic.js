const dbConnection = require('../database/db_connection.js');

const getData = (cb) =>{
    dbConnection.query(`SELECT * FROM superheroes`
    , (err, res) => {
    if (err) cb(err);
    cb(null, res.rows);
  });
};

const insertData = (superHeroInfo, cb) => {
  const { name, superPower, weight } = superHeroInfo;
  dbConnection.query(`INSERT INTO superheroes (name, superPower, weight) VALUES (${name}, ${superPower}, ${weight})`, (err, res) => {
    if (err) return cb(err)
    return cb(null, res)
  });
};

module.exports = { getData, insertData };
