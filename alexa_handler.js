const commands = require('./commands');

function handle(request) {
    switch (request.result.action) {
        case 'input':
            return commands.zone1.Input(request.result.parameters);
        case 'volume.up':
            return commands.zone1.Volume('up', request.result.value);
        case 'volume.down':
            return commands.zone1.Volume('down', request.result.value);
        case 'volume.change':
            return commands.zone1.Volume('change', request.result.value);
    }
}

module.exports = handle;
