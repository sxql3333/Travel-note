const mongoose = require('mongoose');

let TravelSchema = mongoose.Schema({
    _id: String,
    title: String,
    image: [String], 
    content: String,
    count: Number,   //点赞数
    commentnum: Number,   //评论数
    // created_time: Date,
    views: Number,
    is_approved: Number, // 是否通过,0为未通过,1为通过
    user_id: String,  //游记作者id
    name: String,  //游记作者
    is_deleted: Number,
    reason:String, //删除原因

})
module.exports = TravelSchema;