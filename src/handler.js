const http = require('http');

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
