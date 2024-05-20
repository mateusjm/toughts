// importando pacotes
const express = require('express')
const router = express.Router()

// importando AuthController
const AuthContoller = require('../controllers/AuthController')

// rotas
router.get('/login', AuthContoller.login)
router.get('/register', AuthContoller.register)

// exportando router
module.exports = router