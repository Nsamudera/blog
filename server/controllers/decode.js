const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

class Controller {
    static decode(req, res) {
        let decoded = jwt.verify(req.headers.token, process.env.JWT_secret)
        //find if user still exist in database
        User
            .findOne({
                email:decoded.email
            })
            .then((data) => {
                if(data) {
                    res.status(200).json({message:`Welcome ${decoded.name}`, data: decoded})
                } else {
                    res.status(400).json({message: "User is no longer in database"})
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ message: err.message, note: 'Please see console log for details' })
            })
    }

}

module.exports = Controller