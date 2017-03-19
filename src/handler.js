const handler = (request, response) => {
  let body = "Hello World";
  response.writeHead(200,{
    'content-type': 'text/plain'
  });
  response.end(body);
};

module.exports = handler;
