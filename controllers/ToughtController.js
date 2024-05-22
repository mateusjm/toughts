// importando pacotes
const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {

    // renderizar todos pensamentos
    static async showToughts(req, res) {
        res.render('toughts/home')
    }

    // renderizar dashboard
    static async dashboard(req, res) {
        res.render('toughts/dashboard')
    }

    // renderizar criação de pensamentos
    static createToughts(req, res) {
        res.render('toughts/create')
    }

}
