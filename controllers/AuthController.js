// importando o model User
const User = require('../models/User')

// importando biblioteca de criptografia bcrypt
const bcrypt = require('bcryptjs')

module.exports = class AuthContoller {

    // rederizar login
    static login(req, res) {
        res.render('auth/login')
    }

    // renderizar register
    static register(req, res) {
        res.render('auth/register')
    }

    // criar register
    static async registerPost(req, res) {

        const {name, email, password, confirmpassword} = req.body

        // validação de senha
        if(password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')

            return
        }
    }

}