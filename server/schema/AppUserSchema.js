const mongoose = require('mongoose');

let AppUserSchema = mongoose.Schema({
    name: String,
    password: String,
    avater: String
})

module.exports = AppUserSchema;