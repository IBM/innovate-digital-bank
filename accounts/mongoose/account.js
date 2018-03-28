const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Account = new Schema({
    uuid: String,
    type: String,
    currency: String,
    balance: Number,
    number: Number
});

module.exports = mongoose.model('Account', Account, "accounts");
