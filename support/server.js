'use strict';

require('dotenv').config({silent: true, path: `${__dirname}/.env`});

var server = require('./app');
var port = 4000;

server.listen(port, function () {
    console.log('Server running on port: %d', port);
});
