'use strict';

const mongoose = require('mongoose'); //mongodb connector
require('dotenv').config({silent: true});


var server = require('./app');
var port = process.env.PORT || 3200;

mongoose.connect(process.env.MONGO_URL, function (ignore, connection) {
  connection.onOpen()
  server.listen(port, function() {
    console.log('Server running on port: %d', port);
  });
});
