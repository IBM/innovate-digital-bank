'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const accounts = require('./mongoose/account');

var app = express();

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.post('/api/accounts/create', function (req, res) {
    let number = Math.floor(Math.random() * 900000);
    let balance = 0;
    if (req.body.type === 'current') {
        balance = 5000;
    }
    if (req.body.type === 'credit') {
        balance = 40000;
    }
    var newAccount = {
        uuid: req.body.uuid,
        type: req.body.type,
        currency: req.body.currency,
        balance: balance,
        number: number
    };
    accounts.create(newAccount, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        console.log("Account created");
        res.status(200).send({'message': 'Done!'});
    });
});

app.post('/api/accounts/get', function (req, res) {
    accounts.find({'uuid': req.body.uuid}, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send({'err': err});
            return;
        }
        res.status(200).send(results);
    });
});

app.post('/api/accounts/deposit', function (req, res) {
    accounts.find({'number': req.body.number}, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send({'err': err});
            return;
        }
        if (results.length === 0) {
            console.log('account not found');
            res.status(500).send({'err': 'account not found'});
            return;
        }
        let amount = Number(results[0].balance) + Number(req.body.amount);
        accounts.findOneAndUpdate({'number': req.body.number}, {'balance': amount}, function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).send({'err': err});
                return;
            }
            res.status(200).send(results);
        });
    });
});

app.post('/api/accounts/withdraw', function (req, res) {
    accounts.find({'number': req.body.number}, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send({'err': err});
            return;
        }
        if (results.length === 0) {
            console.log('account not found');
            res.status(500).send({'err': 'account not found'});
            return;
        }
        let amount = Number(results[0].balance) - Number(req.body.amount);
        accounts.findOneAndUpdate({'number': req.body.number}, {'balance': amount}, function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).send({'err': err});
                return;
            }
            res.status(200).send(results);
        });
    });
});

app.get('/api/accounts/drop', function (req, res) {
    accounts.collection.drop();
    res.status(200).send({'message': 'Done!'});
});

module.exports = app;
