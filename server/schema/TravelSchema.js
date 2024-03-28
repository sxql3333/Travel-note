const mongoose = require('mongoose');

let TravelSchema = mongoose.Schema({
    _id: String,
    title: String,
    content: String,
    images: [String], 
    created_time: Date,
    is_approved: Boolean,
    views: Number,
    user_id: String
})
module.exports = TravelSchema;