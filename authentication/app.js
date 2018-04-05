'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const users = require('./mongoose/user');
const uuidv4 = require('uuid/v4');

var app = express();

app.use(bodyParser.json());

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.post('/api/user/create', function (req, res) {
    findUser({'email': req.body.email}, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).send('Something went wrong. Try again in a few seconds, or contact support.');
            return;
        }
        if (user) {
            res.status(500).send({'err': 'Seems like you already have an account with us. Please log in instead, or contact support to recover regain to your account.'});
            return;
        }
        var uuid = uuidv4();
        var newUser = {
            uuid: uuid,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            dob: req.body.dob,
            eid: req.body.eid,
            password: req.body.password
        };
        users.create(newUser, function (err) {
            if (err) {
                console.log(err);
                res.status(500).send('Something went wrong. Try again in a few seconds, or contact support.');
                return;
            }
            console.log("User created");
            res.status(200).send(newUser);
        });
    });
});

app.post('/api/user/authenticate', function (req, res) {
    findUser({'email': req.body.email, 'password': req.body.password}, function (err, user) {
        if (err) {
          console.log(err);
          res.status(500).send({'err': 'Something went wrong. Try again in a few seconds, or contact support.'});
          return;
        }
        if (!user) {
          res.status(500).send({'err': `Your username & password are incorrect. Try again, or contact support to recover lost login details. `});
          return;
        }
        res.status(200).send(user);
    });
});

app.get('/api/user/get', function(req, res) {
    findUser({}, function (err, users) {
        if (err) {
            console.log(err);
            res.status(500).send({'err': 'Something went wrong. Try again in a few seconds, or contact support.'});
            return;
        }
        if (!users) {
            res.status(500).send({'err': 'No Users Found'});
            return;
        }
        res.status(200).send(users);
    });
});

function findUser (criteria, callback){
    users.find(criteria, function (err, results) {
        if (err) {
            console.log(err);
            callback(err);
        }
        if (Object.keys(criteria).length > 0) {
          results = results[0];
        }
        callback(null, results);
    });
};

module.exports = app;
