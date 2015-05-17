var net = require('net');

var client = net.connect({
    port: 60128,
    host: '192.168.1.4'
  },
  function() {
    console.log('client connected');
    client.write('ISCP\x00\x00\x00\x10\x00\x00\x00\n\x01\x00\x00\x00!1ZVL32\r\n');
  }
);

client.on('data', function(data) {
  console.log(data.toString());
});
