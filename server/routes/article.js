const router = require('express').Router()
const Controller = require('../controllers/article.js')

router.get('/', Controller.getAllArticles)
router.get('/user/', Controller.getUserArticle)
router.post('/user/create', Controller.createArticle)
router.put('/user/edit', Controller.editArticle)
router.delete('/user/delete', Controller.deleteArticle)

module.exports = router