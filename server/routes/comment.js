const router = require('express').Router()
const Controller = require('../controllers/comment.js')

//Need to create middleware to check that the item being deleted belongs to the user logged in

router.get('/', Controller.getAllComments)


module.exports = router