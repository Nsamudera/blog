const jwt = require('jsonwebtoken')
require('dotenv').config()

function createJWTToken(data) {
    return new Promise(function(resolve, reject) {
        let tokenContent = {
            _id: data._id,
            email: data.email,
            articles: data.articles,
            name: data.name
        }
        let token = jwt.sign(tokenContent, process.env.JWT_secret)
        resolve(token)
    })
}

module.exports = createJWTToken