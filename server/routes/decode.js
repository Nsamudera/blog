const router = require('express').Router()
const Controller = require('../controllers/decode.js')

router.post('/', Controller.decode)

module.exports = router