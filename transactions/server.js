'use strict';

const mongoose = require('mongoose');
require('dotenv').config({silent: true, path: `${__dirname}/.env`});

var server = require('./app');
var port = 3600;

mongoose.connect(process.env.MONGO_URL, function (ignore, connection) {
  console.log(process.env.MONGO_URL)
    connection.onOpen();
    server.listen(port, function () {
        console.log('Server running on port: %d', port);
    });
});
