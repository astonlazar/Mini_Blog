const express = require('express')
const { userRegister, userLogin } = require('../controllers/userController')
const authRouter = express.Router()

authRouter.post('/register', userRegister)
authRouter.post('/login', userLogin)

module.exports = authRouter