const router = require('express').Router()
const Controller = require('../controllers/comment.js')

router.get('/', Controller.getAllComments)
router.post('/add', Controller.addComment)
router.put('/edit', Controller.editComment)
router.delete('/delete', Controller.removeComment)

module.exports = router