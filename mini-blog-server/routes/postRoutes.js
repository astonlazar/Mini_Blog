const express = require('express')
const { postCreate, postUpdate, postDelete, allPosts, onePost, allPostOfUser } = require('../controllers/postController')
const verifyToken = require('../middlewares/verifyToken')
const postRouter = express.Router()

postRouter.get('/', allPosts)
postRouter.get('/user', verifyToken, allPostOfUser)
postRouter.get('/:id', onePost)
postRouter.post('/', verifyToken, postCreate)
postRouter.put('/:id', verifyToken, postUpdate)
postRouter.delete('/:id', verifyToken, postDelete)

module.exports = postRouter