const start = 'ISCP\x00\x00\x00\x10\x00\x00\x00\n\x01\x00\x00\x00!1';
const end = '\r\n';

function Zone1InputCommand(whichInput = 'cable') {
    let source = '';

    switch (whichInput) {
        case 'cable':
            source = 'SLI01';
            break;
        case 'netflix':
            source = 'SLI02';
            break;
        case 'chromecast':
            source = 'SLI06';
            break;
    }

    return `${start}${source}${end}`;
}

function Zone1VolumeCommand(modifier = 'up', value = 1) {
    let command = 'MVL';
    value = parseInt(value).toString(16);

    switch (modifier) {
        case 'up':
            command += 'UP' + value;
            break;
        case 'down':
            command += 'DOWN' + value;
            break;
        case 'change':
            command += value;
            break;
    }

    return `${start}${command}${end}`;
}

module.exports.zone1 = {
    'Input': Zone1InputCommand,
    'Volume': Zone1VolumeCommand
};

module.exports.zone2 = {
    'Input': Zone1InputCommand,
    'Volume': Zone1VolumeCommand
};