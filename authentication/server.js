'use strict';

const mongoose = require('mongoose');
require('dotenv').config({silent: true, path: `${__dirname}/.env`});

var server = require('./app');
var port = 3200;

let mongoUrl = process.env.NODE_ENV
if (process.env.TOOLCHAIN_FLAG==="active") mongoUrl = `mongodb://${process.env.MONGO_USERNAME}:${MONGO_PASSWORD}@${process.env.CLUSTER_NAMESPACE}-innovate-bank-mongodb.${process.env.CLUSTER_NAMESPACE}.svc.cluster.local/${process.env.MONGO_PORT}`

mongoose.connect(mongoUrl, function (ignore, connection) {
    connection.onOpen();
    server.listen(port, function () {
        console.log('Server running on port: %d', port);
    });
});
