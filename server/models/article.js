const mongoose = require('mongoose')

const Schema = mongoose.Schema
const articleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: new Date()
    },
    updatedDate: {
        type: Date,
        default: new Date()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
	}]
})

const Article = mongoose.model('Article', articleSchema, 'Articles')

module.exports = Article