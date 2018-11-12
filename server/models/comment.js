const mongoose = require('mongoose')

const Schema = mongoose.Schema
const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: new Date()
    }
})

const Comment = mongoose.model('Comment', commentSchema, 'Comments')

module.exports = Comment