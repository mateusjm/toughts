// importando pacotes
const express = require('express')
const router = express.Router()

// controller
const ToughtController = require('../controllers/ToughtController')

// importando função checkAuth de helpers
const checkAuth = require('../helpers/auth').checkAuth

// routes
router.get('/add', checkAuth, ToughtController.createToughts)
router.post('/add', checkAuth, ToughtController.createToughtsSave)
router.get('/edit/:id', checkAuth, ToughtController.updateTought)
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.post('/remove', checkAuth, ToughtController.removeToughtsSave)
router.get('/', ToughtController.showToughts)

// exportando router
module.exports = router