const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user_id:{
        type:String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

const cakeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    comments: [commentSchema]
    // img: {
    //     data: Buffer,
    //     contentType: String
    // }
});

module.exports = mongoose.model('cake', cakeSchema);