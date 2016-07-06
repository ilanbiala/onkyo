var commands = {
  main: {
    off: '00',
    on: '01',
    source: {
      cable: 'SLI01',
      computer: 'SLI05',
      disk: 'SLI22',
      radio: 'SLI24',
      chromecast: 'SLI06'
    },
    volume: {
      raise: 'MVLUP',
      lower: 'MVLDOWN',
      change: 'MVL'
    }
  }
};

function isZone1(message) {
  return message.search(/master|zone 1|zone one/i) !== -1 || message.search(/zone 2|zone two/) == -1;
}

function Command(message) {
  this.message = message;
  this.string = Command.machinize(message);
}

Command.parse = function(message) {
  if (isZone1(message)) {
    if (message.search(/volume/i) !== -1) {
      if (message.search(/raise/i) !== -1) {
        return commands.main.volume.raise;
      } else if (message.search(/lower/i) !== -1) {
        return commands.main.volume.lower;
      } else {
        var result = (/\d+/).exec(message);
        var num = result.length ? Number(result[0]).toString(16).toUpperCase() : 0;
        return commands.main.volume.change + num;
      }
    } else if (message.search(/source/i) !== -1) {
      if (message.search(/cable|tv/) !== -1) {
        return commands.main.source.cable;
      } else if (message.search(/pc|computer/i) !== -1) {
        return commands.main.source.computer;
      } else if (message.search(/radio|fm/i) !== -1) {
        return commands.main.source.radio;
      }
    }
  }
};

Command.machinize = function(message) {
  var cmd = Command.parse(message);

  return 'ISCP\x00\x00\x00\x10\x00\x00\x00\n\x01\x00\x00\x00!1' + cmd + '\r\n';
};

Command.prototype.toString = function() {
  return this.string;
};

module.exports = Command;
