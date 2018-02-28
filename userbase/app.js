'use strict';

const express = require('express'); // app server
const bodyParser = require('body-parser'); // parser for post requests
const uuidv4 = require('uuid/v4');
const dateFormat = require('dateformat');
const request = require('request');

var app = express();

app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
 });

require('./populate.js')(request, dateFormat)

module.exports = app;
