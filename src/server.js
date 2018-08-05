const http = require('http');
const handler = require('./handler.js');

const server = http.createServer(handler);
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

  server.listen(port, () => {
    console.log(`Magic happens @:
      http://${host}:${port}`);
  });
