const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Bill = new Schema({
    uuid: String,
    category: String,
    entity: String,
    account_no: String,
    amount: Number,
    currency: String,
    date: String
});

module.exports = mongoose.model('Bill', Bill, "bills");
