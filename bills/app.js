'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const bills = require('./mongoose/bill');

var app = express();

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.post('/api/bills/create', function (req, res) {
    var newBill = {
        uuid: req.body.uuid,
        category: req.body.category,
        entity: req.body.entity,
        account_no: req.body.account_no,
        amount: req.body.amount,
        date: req.body.date
    };
    bills.update({'category': req.body.category}, newBill, {upsert: true}, function (err) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }
        console.log("Bill created");
        res.status(200).send({'message': 'Done!'});
    });
});

app.post('/api/bills/get', function (req, res) {
    bills.find({'uuid': req.body.uuid}, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send({'err': err});
            return;
        }
        res.status(200).send(results);
    });
});

app.get('/api/bills/drop', function (req, res) {
    bills.collection.drop();
    res.status(200).send({'message': 'Done!'});
});

module.exports = app;
