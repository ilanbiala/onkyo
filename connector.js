const net = require('net');
const Command = require('./command');

module.exports = class Receiver {
  constructor(options) {
    this.options = options;
    this.history = [];
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client = net.createConnection(this.options, () => {
        console.log('Connected to Onkyo receiver at %s:%s', this.options.host, this.options.port);

        this.on('data', (data) => {
          console.log('confirmed command');
          console.log(data.toString());
        });
        this.on('end', () => console.log('disconnected from server'));

        resolve();
      });
    })
  }

  disconnect() {
    this.client.end();
  }

  on(event, handler) {
    this.client.on(event, handler);
  }

  message(command) {
    let cmd = new Command(command);
    this.client.write((cmd).toString());
    this.history.push(cmd);
  }
}
