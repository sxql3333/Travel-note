const mongoose = require('mongoose');

let AppUserSchema = mongoose.Schema({
    name: String,
    password: String,
    avatar: String //头像
})

module.exports = AppUserSchema;