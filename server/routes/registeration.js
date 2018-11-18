const router = require('express').Router()
const Controller = require('../controllers/registeration.js')

router.post('/signup', Controller.signup)
router.post('/signin', Controller.signin)

module.exports = router