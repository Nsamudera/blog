//Model
const Comment = require('../models/comment.js')
const User = require('../models/user.js')
const Article = require('../models/article.js')

const decode = require('../helpers/decode.js')

class Controller {
    static getAllComments(req, res) {
        Comment
            .find()
            .populate("authorId")
            .then((data) => {
                res.status(200).json({ message: 'Data retrieval success', data: data })
            })
            .catch((err) => {
                // console.log(err)
                res.status(500).json({ message: err, note: "See console for details" })
            })
    }
    static addComment(req, res) {
        //decode token to see if it is valid and to find the author of comment
        decode(req.headers.token)
            .then((decoded) => {
                // console.log(decoded)
                //check if user exist in database
                User
                    .findOne({ email: decoded.email })
                    .then((data) => {
                        if (data) {
                            //find if article exist
                            return Article
                                .find({ _id: req.body.articleId })
                                .then((article) => {
                                    //if article exist
                                    if (article.length > 0) {
                                        //create new Comment
                                        return Comment
                                            .create(
                                                {
                                                    comment: req.body.comment,
                                                    authorId: decoded._id,
                                                    author: decoded.name,
                                                    articleId: req.body.articleId
                                                })
                                            .then((result) => {
                                                // console.log(result)
                                                // add comment to "comments" property in "Article"
                                                let newComments = article[0].comments
                                                console.log(newComments)
                                                newComments.push(result._id)
                                                //need to update Article
                                                Article.findOneAndUpdate({
                                                    _id: req.body.articleId
                                                },
                                                    {
                                                        comments: newComments
                                                    })
                                                    .then((data) => {
                                                        res.status(201).json({ message: 'Comment successfully created', data: result })
                                                    })
                                            })
                                        //if article does not exist
                                    } else {
                                        res.status(400).json({ message: "Invalid article" })
                                    }
                                })
                        } else {
                            res.status(400).json({ message: "Invalid user" })
                        }
                    })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err.message })
            })
    }
    static editComment(req, res) {
        decode(req.headers.token)
            .then((decoded) => {
                //check if user exist in database
                User
                    .findOne({ email: decoded.email })
                    .then((data) => {
                        if (data) {
                            //find if comment exist and check if the user is authorized
                            return Comment
                                .findOne(
                                    {
                                        _id: req.body.commentId
                                    }
                                )
                                .then((commentData) => {
                                    if (String(commentData.authorId) === String(data._id)) {
                                        //edit comment
                                        return Comment
                                            .findOneAndUpdate(
                                                {
                                                    _id: req.body.commentId
                                                },
                                                {
                                                    $set: {
                                                        comment: req.body.comment,
                                                    }
                                                })
                                            .then((result) => {
                                                res.status(200).json({ message: "Comment successfully edited" })
                                            })
                                    } else {
                                        res.status(403).json({ message: "You are not authorized to edit this comment" })
                                    }
                                })
                        } else {
                            res.status(400).json({ message: "Invalid user" })
                        }
                    })
            })
    }
    static removeComment(req, res) {
        decode(req.headers.token)
            .then((decoded) => {
                //check if user exist in database
                User
                    .findOne({ email: decoded.email })
                    .then((data) => {
                        if (data) {
                            //find if comment exist and check if the user is authorized
                            return Comment
                                .findOne(
                                    {
                                        _id: req.body.commentId
                                    }
                                )
                                .then((commentData) => {
                                    if (String(commentData.authorId) === String(data._id)) {
                                        //delete comment
                                        return Comment
                                            .deleteOne({ _id: req.body.commentId })
                                            .then(() => {
                                                //find the comment in related article
                                                return Article
                                                    .findOne(
                                                        { _id: commentData.articleId },
                                                    )
                                                    .then((article) => {
                                                        let newArray = article.comments.filter(comment => comment != req.body.commentId)
                                                        return Article
                                                            .update(
                                                                {
                                                                    _id: commentData.articleId
                                                                },
                                                                {
                                                                    comments: newArray
                                                                })
                                                            .then(() => {
                                                                res.status(200).json({ message: "Comment successfully deleted" })
                                                            })
                                                    })
                                            })
                                    } else {
                                        res.status(403).json({ message: "You are not authorized to edit this comment" })
                                    }
                                })
                        } else {
                            res.status(400).json({ message: "Invalid user" })
                        }
                    })
            })
    }
}

module.exports = Controller