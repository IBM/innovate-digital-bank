'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const request = require('request');
const ip = require('ip');

const config = require(`${__dirname}/config`)[process.env.NODE_ENV];
console.log(config.ports)
var app = express();

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

let basePath = 'http://localhost';
if (process.env.NODE_ENV!='development') basePath = `http://${ip.address()}`;

require('./populate.js')(request, basePath, config.ports, dateFormat);

module.exports = app;
