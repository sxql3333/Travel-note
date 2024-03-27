const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    name: String,
    password: String
})

module.exports = UserSchema;