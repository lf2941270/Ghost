// ## Server Loader
// Passes options through the boot process to get a server instance back
var server = require('./server');

// Set the default environment to be `development`
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('ENV:' + process.env.NODE_ENV);
function makeGhost(options) {
    options = options || {};

    return server(options);
}

module.exports = makeGhost;
