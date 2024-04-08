const mongoose = require('mongoose');

let TravelSchema = mongoose.Schema({
    _id: String,
    title: String,
    image: [String], 
    content: String,
    count: Number,
    commentnum: Number,
    // created_time: Date,
    views: Number,
    is_approved: Number, // 是否通过
    user_id: String,

})
module.exports = TravelSchema;