const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    name: String,
    password: String,
    auth: Number
})

module.exports = UserSchema;