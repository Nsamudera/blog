//Model
const Article = require('../models/article.js')
const User = require('../models/user.js')
const decode = require('../helpers/decode.js')

class Controller {
    static getAllArticles(req, res) {
        Article
            .find()
            .populate("author")
            .populate("comments")
            .then((data) => {
                res.status(200).json({ message: 'Data retrieval success', data: data })

            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ message: err, note: "See console for details" })
            })
    }
    static createArticle(req, res) {
        //decode the token to see who the user is (email)
        decode(req.headers.token)
            .then((decoded) => {
                //check if user exist in database
                User
                    .findOne({ email: decoded.email })
                    .then((data) => {
                        if (data) {
                            //check if the decoded author is the same as the one in req.body
                            if(decoded._id == req.body.authorId) {
                                return Article
                                .create({
                                    name: req.body.name,
                                    body: req.body.body,
                                    author: req.body.authorId
                                })
                                .then((result) => {
                                    //push article to user "Articles" property
                                    let currentArticle = data.articles
                                    currentArticle.push(result)
                                    User
                                        .updateOne({
                                            email: data.email
                                        }, {
                                                articles: currentArticle
                                            })
                                        .then((data) => {
                                            res.status(201).json({ message: "Article successfully created", data: result })
                                        })
                                })
                            } else {
                                res.status(403).json({ message: "You are not authorized to create this article" })
                            }
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
    static getUserArticle(req, res) {
        //decode the token to see who the user is (email)
        decode(req.headers.token)
            .then((decoded) => {
                //check if user exist in database
                User
                    .findOne({ email: decoded.email })
                    .populate("articles")
                    .then((data) => {
                        if (data) {
                            res.status(200).json({ message: "Data retrieval success", data: data.articles })
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
    static editArticle(req, res) {
        decode(req.headers.token)
            .then((decoded) => {
                //check if user exist in database
                User
                    .findOne({ email: decoded.email })
                    .then((data) => {
                        if (data) {
                            //check if the article that is going to be edited belong to the token user
                            //find the article in the user data
                            let indexofArticle = data.articles.indexOf(req.body.articleId)
                            if (String(req.body.articleId) === String(data.articles[indexofArticle])) {
                                return Article
                                    .findOneAndUpdate(
                                        {
                                            _id: req.body.articleId
                                        },
                                        {
                                            $set: {
                                                name: req.body.name,
                                                body: req.body.body,
                                                updatedDate: new Date()
                                            }
                                        })
                                    .then((result) => {
                                        res.status(200).json({ message: "Article successfully edited" })
                                    })
                            } else {
                                res.status(403).json({ message: "You are not authorized to edit this comment" })
                            }
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
    static deleteArticle(req, res) {
        //decode the token to see who the user is (email)
        decode(req.headers.token)
            .then((decoded) => {
                //check if user exist in database
                User
                    .findOne({ email: decoded.email })
                    .then((data) => {
                        //create new article array without the deleted article
                        let newArray = data.articles.filter(article => article != req.body.articleId)
                        if (data) {
                            //to find the index of the article in "articles" propertie of the user
                            let indexofArticle = data.articles.indexOf(req.body.articleId)
                            // if the article we want to delete is in the "articles" list of the decoded user, then we delete the article and update the user's "articles"
                            if (String(req.body.articleId) === String(data.articles[indexofArticle])) {
                                return Article
                                    .deleteOne({ _id: req.body.articleId })
                                    .then((result) => {
                                        //delete the article from the user "Article list"
                                        return User
                                            .updateOne(
                                                {
                                                    email: decoded.email
                                                },
                                                {
                                                    articles: newArray
                                                })
                                            .then(() => {
                                                res.status(200).json({ message: "Article successfully deleted" })
                                            })
                                    })
                            } else {
                                res.status(403).json({ message: "You are not authorized to edit this comment" })
                            }

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
}

module.exports = Controller