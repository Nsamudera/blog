//Model
const User = require('../models/user.js')
//Bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Helpers
const createJWTToken = require('../helpers/createJWT_Token.js')

class Controller {
    static signup(req, res) {
        //check if email is unique
        User
            .findOne({
                email: req.body.email
            })
            .then ((data) => {
                //if email found, state that email is not unique
                if (data) {
                    res.status(400).json({ message: 'Email already taken' })
                    //email is not taken ('data' is null)
                } else {
                    //encrypt password
                    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ message: err.message, note: 'Please see console log for details' })
                        } else {
                            //add user to database
                            //if password is not null
                            if (req.body.password) {
                                let newUser = new User({
                                    email: req.body.email,
                                    password: hash
                                })
                                newUser.save(function (err) {
                                    if (err) {
                                        console.log(err)
                                        res.status(400).json({ message: err.message, note: 'Please see console log for details' })
                                    } else {
                                        console.log(newUser)
                                        res.status(201).json({message: `Successfully signed up`, data: newUser})
                                    }
                                })
                            //else if password is empty
                            } else {
                                res.status(400).json({ message: 'Password required', note: 'Please see console log for details' })
                            }
                        }
                    });
                }  
            })
    }
    static signin(req, res) {
        //find if email exist
        User
            .find({email: req.body.email})
            .then((data) => {
                //if found
                if(data.length > 0) {
                    //check if password is same

                    bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                        if(err) {
                            console.log(result)
                            res.status(500).json({message: err, note: "See console for details"})
                        } else {
                            if(result) {
                                // console.log(result)
                                return createJWTToken(data[0])
                                .then(token => {
                                    res.status(200).json({ message: 'Successfully logged in', token: token})
                                })
                            } else {
                                res.status(400).json({message: "Password invalid"})
                            }
                        }
                    });
                //if not found
                } else {
                    res.status(400).json({message: "User not found"})
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err, note: "See console for details"})
            })
    }
}

module.exports = Controller