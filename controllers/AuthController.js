// importando o model User
const User = require('../models/User')

// importando biblioteca de criptografia bcrypt
const bcrypt = require('bcryptjs')

module.exports = class AuthContoller {

    // renderizar login
    static login(req, res) {
        res.render('auth/login')
    }

    // criar formulário login
    static async loginPost(req, res) {
        
        const {email, password} = req.body

        // encontrar usuário
        const user = await User.findOne({ where: {email: email}})

        if(!user) {
            req.flash('message', 'Usuário não encontrado!')
            res.redirect('/login')

            return
        }

        // verificar se as senhas correspondem
        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch) {
            req.flash('message', 'Senha inválida!')
            res.redirect('/login')

            return
        }

        // inicializar a sessão
        req.session.userid = user.id

        req.flash('message', 'Autenticação realizada com sucesso!')

        // salvar sessão
        req.session.save(()=> {
            res.redirect('/') 
        })

    }

    // renderizar register
    static register(req, res) {
        res.render('auth/register')
    }

    // criar formulário register
    static async registerPost(req, res) {

        const {name, email, password, confirmpassword} = req.body

        // validação de senha
        if(password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')

            return
        }

        // checar se usuário existe
        const checkIfUserExists = await User.findOne({where: {email: email}})

        if(checkIfUserExists) {
            req.flash('message', 'O e-mail já está em uso!')
            res.render('auth/register')

            return
        }

        // criar uma senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name, 
            email, 
            password: hashedPassword
        }

        // criar usuário no banco de dados
        try {
            const createdUser = await User.create(user)

            // inicializar a sessão
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')

            // salvar sessão
            req.session.save(()=> {
                res.redirect('/') 
            })
            
        } catch (error) {
            console.log(error)
        }
        
    }

    // sair da dashboard
    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }

}