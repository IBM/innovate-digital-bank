const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Transaction = new Schema({
    uuid: String,
    amount: Number,
    currency: String,
    description: String,
    date: String,
    category: String
});

module.exports = mongoose.model('Transaction', Transaction, "transactions");
