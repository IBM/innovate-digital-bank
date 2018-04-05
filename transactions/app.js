'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const transactions = require('./mongoose/transaction');

var app = express();

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.post('/api/transactions/create', function (req, res) {
    var newTransaction = {
        uuid: req.body.uuid,
        amount: req.body.amount,
        currency: req.body.currency,
        description: req.body.description,
        date: req.body.date,
        category: req.body.category
    };
    transactions.create(newTransaction, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        console.log("Transaction created");
        res.status(200).send({'message': 'Done!'});
    });
});

app.post('/api/transactions/get', function (req, res) {
    transactions.find({'uuid': req.body.uuid}, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send({'err': err});
            return;
        }
        console.log('Fetched ', results);
        res.status(200).send(results);
    });
});

app.get('/api/transactions/drop', function (req, res) {
    transactions.collection.drop();
    res.status(200).send({'message': 'Done!'});
});

module.exports = app;
