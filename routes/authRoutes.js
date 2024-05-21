// importando pacotes
const express = require('express')
const router = express.Router()

// importando AuthController
const AuthContoller = require('../controllers/AuthController')

// rotas
router.get('/login', AuthContoller.login)
router.post('/login', AuthContoller.loginPost)
router.get('/register', AuthContoller.register)
router.post('/register', AuthContoller.registerPost)
router.get('/logout', AuthContoller.logout)

// exportando router
module.exports = router