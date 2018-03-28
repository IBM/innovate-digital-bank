const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var User = new Schema({
    uuid: String,
    name: String,
    email: String,
    phone: String,
    gender: String,
    dob: String,
    eid: String,
    password: String
});

module.exports = mongoose.model('User', User, "users");
