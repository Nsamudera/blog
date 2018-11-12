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
                res.status(200).json({message: 'Data retreival sucess', data:data})

            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err, note: "See console for details"})
            })
    }
    static createArticle(req, res) {
        //decode the token to see who the user is (email)
        decode(req.headers.token)
            .then((decoded) => {
                //check if user exist in database
                User
                    .findOne({email: decoded.email})
                    .then((data) => {
                        if(data) {
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
                                    },{
                                        articles: currentArticle
                                    })
                                    .then((data) => {
                                        res.status(201).json({message: "Article successfully created", data: result})
                                    })
                            })
                        } else {
                            res.status(400).json({message: "Invalid user"})
                        }
                    })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err.message})
            })
    }
    static getUserArticle(req, res) {
        //decode the token to see who the user is (email)
        decode(req.headers.token)
            .then((decoded) => {
                //check if user exist in database
                User
                    .findOne({email: decoded.email})
                    .populate("articles")
                    .then((data) => {       
                        if(data) {
                            res.status(200).json({message: "Data retrieval success", data: data.articles})
                        } else {
                            res.status(400).json({message: "Invalid user"})
                        }
                    })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err.message})
            })
    }
    static editArticle(req, res) {
        decode(req.headers.token)
            .then((decoded) => {
                //check if user exist in database
                User
                    .findOne({email: decoded.email})
                    .then((data) => {       
                        if(data) {
                            return Article
                                    .findOneAndUpdate(
                                        {
                                            _id:req.body.articleId
                                        },
                                        {
                                            $set:{
                                                name: req.body.name,
                                                body: req.body.body,
                                                updatedDate: new Date()
                                            }
                                        })
                                        .then((result) => {
                                            res.status(200).json({message: "Article successfully edited"})
                                        })
                        } else {
                            res.status(400).json({message: "Invalid user"})
                        }
                    })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err.message})
            })
    }
    static deleteArticle(req, res) {
        //decode the token to see who the user is (email)
        decode(req.headers.token)
            .then((decoded) => {
                //check if user exist in database
                User
                    .findOne({email: decoded.email})
                    .then((data) => {
                        let indexofDelete = data.articles.indexOf(req.body.articleId)
                        let newArray = data.articles.splice(indexofDelete,1)
                        if(data) {
                            return Article
                                    .deleteOne({_id: req.body.articleId})
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
                                                        res.status(200).json({message: "Article successfully deleted"})
                                                    })
                                    })
                        } else {
                            res.status(400).json({message: "Invalid user"})
                        }
                    })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err.message})
            })

    }
}

module.exports = Controller