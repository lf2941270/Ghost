// # Ghost bootloader
// Orchestrates the loading of Ghost
// When run from command line.

var server = require('./server');

process.env.NODE_ENV = (process.env.SERVER_SORTWARE  && process.env.SERVER_SORTWARE === 'bae/3.0') ? 'production' : 'development';
//process.env.NODE_ENV = 'production';
function makeGhost(options) {
    options = options || {};

    return server(options);
}

module.exports = makeGhost;
