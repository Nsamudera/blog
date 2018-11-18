const mongoose = require('mongoose')

const Schema = mongoose.Schema
const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author: {
        type: String,
        required: true
    },
    articleId: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    createdDate: {
        type: Date,
        default: new Date()
    }
})

const Comment = mongoose.model('Comment', commentSchema, 'Comments')

module.exports = Comment