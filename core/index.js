// # Ghost bootloader
// Orchestrates the loading of Ghost
// When run from command line.

var server = require('./server');

process.env.NODE_ENV = (SERVER_SORTWARE  && SERVER_SORTWARE === 'bae/3.0') ? 'product' : 'development';

function makeGhost(options) {
    options = options || {};

    return server(options);
}

module.exports = makeGhost;
