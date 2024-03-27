const mongoose = require('mongoose');

let TravelkSchema = mongoose.Schema({
    _id: String,
    title: String,
    description: String,
    priority:String
})
module.exports = TravelSchema;