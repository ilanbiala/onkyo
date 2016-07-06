// var http = require('http');
// var fs = require('fs');

// var server = http.createServer( function(req, res) {
//     console.dir(req.param);

//     if (req.method === 'POST') {
//         console.log("POST");
//         var body = '';
//         req.on('data', function (data) {
//             body += data;
//             console.log("Partial body: " + body);
//         });
//         req.on('end', function () {
//             console.log("Body: " + body);
//         });
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('post received');
//     } else {
//         console.log("GET");
//         //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
//         var html = fs.readFileSync('index.html');
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(html);
//     }
// });

// port = 3000;
// host = '127.0.0.1';
// server.listen(port, host);
// console.log('Listening at http://' + host + ':' + port);





const http = require('http');

const Connector = require('./connector');

const onkyo = new Connector({
  port: 60128,
  host: '192.168.1.111'
});

onkyo
  .connect()
  .then(() => {
    const hostname = '127.0.0.1';
    const port = 3000;

    const server = http.createServer((req, res) => {
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
