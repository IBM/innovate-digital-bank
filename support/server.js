'use strict';

require('dotenv').config({silent: true, path: `${__dirname}/.env`});

var server = require('./app');
var port = 4000;

console.log(`Running on ${process.env.BASE_PATH}:${port}, reading from ${process.env.CONVERSTATION_WORKSPACE}`)

server.listen(port, function () {
    console.log('Server running on port: %d', port);
});
