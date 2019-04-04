const http = require('http');
const staticSuperHeroes = require('./static');
// const getData = require('./dynamic');
const getData = require("./getData");


const handler = (request, response) => {
  let endpoint = request.url.split('/')[1];

  // if(endpoint === 'static'){
  //   let staticData = JSON.stringify(staticSuperHeroes);
  //   response.writeHead(200, {
  //     'content-type': 'application/json'
  //   });
  //   response.end(staticData);
  // }

  if(endpoint === 'dynamic'){
    getData((err,res) => {

      if (err) throw err;

      let dynamicData = JSON.stringify(res);

      response.writeHead(200, {
      'content-type': 'application/json'
    });
    response.end(dynamicData);
  });
  }
}

///new
//const handler = (request, response) => {
  // standard form behaviour - data gets sent to a new webpage in html format
  // receive data from the form
  // let allTheData = "";
  // request.on("data", function(chunkOfData) {
  //   // text from form - outputs buffers
  //   allTheData += chunkOfData;
  //});

  // request.on("end", function() {
  //   // use form data
  //   // const formData = allTheData.split(",");
  //   // const person = formData[0];
  //   // console.log(person);
  //   // post to db
  //   // - args will be: person, food, veg, paid
  //   // postData(person, (err, res) => {
  //   //   if (err) console.log(err);
  //     // run AFTER postData is run - get latest item output to DOM
  //     getData((err, res) => {
  //       if (err) throw err;
  //       let output = JSON.stringify(res);
  //       response.writeHead(200, { "Content-Type": "application/JSON" });
  //       response.end(output);
  //     });
  //   });



module.exports = handler;
