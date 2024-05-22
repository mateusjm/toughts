// importando pacotes
const express = require('express')
const router = express.Router()

// controller
const ToughtController = require('../controllers/ToughtController')

// importando função checkAuth de helpers
const checkAuth = require('../helpers/auth').checkAuth

// routes
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.get('/', ToughtController.showToughts)

// exportando router
module.exports = router