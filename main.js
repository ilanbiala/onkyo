const http = require('http');

const Connector = require('./connector');

const onkyo = new Connector({
  port: 60128,
  host: '67.82.29.190'
});

onkyo
  .connect()
  .then(() => {
    const hostname = '127.0.0.1';
    const port = 3000;

    const server = http.createServer((req, res) => {
      console.log(req);

      if (req.method === 'POST') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log(req.body);
        res.end('Message received\n');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello\n');
      }
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  });
