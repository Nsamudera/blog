const jwt = require('jsonwebtoken')

function decode(token) {
    return new Promise(function(resolve, reject) {
        let decoded = resolve(jwt.verify(token, process.env.JWT_secret))
        if(decoded == undefined) {
        resolve(jwt.verify(token, process.env.JWT_secret))
        } else {
        reject('Invalid Token')
        }
    })
}
module.exports = decode