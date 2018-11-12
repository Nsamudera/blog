const router = require('express').Router()
const Controller = require('../controllers/article.js')

//Need to create middleware to check that the item being deleted belongs to the user logged in

router.get('/', Controller.getAllArticles)
router.get('/user/', Controller.getUserArticle)
router.post('/user/create', Controller.createArticle)
router.put('/user/edit', Controller.editArticle)
router.delete('/user/delete', Controller.deleteArticle)

module.exports = router