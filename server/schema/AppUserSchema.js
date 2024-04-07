const mongoose = require('mongoose');

let AppUserSchema = mongoose.Schema({
    name: String,
    password: String,
    avater: String //头像
})

module.exports = AppUserSchema;