// importando pacotes
const express = require('express')
const router = express.Router()

// controller
const ToughtController = require('../controllers/ToughtController')

// routes
router.get('/', ToughtController.showToughts)

// exportando router
module.exports = router