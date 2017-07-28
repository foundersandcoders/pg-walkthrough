const http = require('http');
const staticSuperHeroes = require('./static.js');
const getData = require('./dynamic.js');

const handler = (request, response) => {
  let endpoint = request.url.split('/')[1];

  if(endpoint === 'static'){
    let staticData = JSON.stringify(staticSuperHeroes);
    response.writeHead(200,{
      'content-type': 'application/json'
    });
    response.end(staticData);
  }
};

module.exports = handler;
