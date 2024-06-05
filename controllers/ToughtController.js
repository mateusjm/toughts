// importando pacotes
const { where } = require('sequelize')
const Tought = require('../models/Tought')
const User = require('../models/User')

// operador
const { Op } = require('sequelize')

module.exports = class ToughtController {

    // renderizar todos pensamentos
    static async showToughts(req, res) {

        let search = ''

        if(req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if(req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        // resgatando dados sem filtro
        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]]
        })

        // limpar os dados do array e pegar somente os pensamentos
        const toughts = toughtsData.map((result)=> result.get({plain: true}))

        let toughtsQty = toughts.length

        if(toughtsQty === 0) {
            toughtsQty = false
        }

        res.render('toughts/home', {toughts, search, toughtsQty})
    }

    // renderizar dashboard
    static async dashboard(req, res) {
        const userId = req.session.userid

        const user = await User.findOne({
            where: {
                id: userId
            },
            include: Tought,
            plain: true
        })

        // caso usuário não exista
        if(!user) {
            res.redirect('/login')
        }
        
        // destruindo outras propriedades de user.Toughts e pegando só dataValues 
        const toughts = user.Toughts.map((result)=> result.dataValues)
        
        // identificando se há pensamentos
        let emptyToughts = false

        // se toughts não tiver pensamentos, ele recebe a mensagem vazia
        if(toughts.length === 0) {
            emptyToughts = true
        }

        res.render('toughts/dashboard', {toughts, emptyToughts})
    }

    // renderizar criação de pensamentos
    static createToughts(req, res) {
        res.render('toughts/create')
    }

    // inserção de pensamentos no banco de dados
    static async createToughtsSave(req, res) {
    
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        try {

            await Tought.create(tought)
            req.flash('message', 'Parabéns! Pensamento criado com sucesso!')

            // garantindo que a requisição foi salva e redirecionamos
            req.session.save(()=> {
                res.redirect('/toughts/dashboard')
            })

        } catch (error) {
            console.log(error)
        }

    }

    // remover pensamentos
    static async removeToughtsSave(req, res) {

        const id = req.body.id
        const UserId = req.session.userid

        try {
            await Tought.destroy({where: {id: id, UserId: UserId}})
            req.flash('message', 'Pensamento removido com suceso!')

            // salvando e redirecionando
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        } catch (error) {
            console.log(error)
        }

    }

    // editar pensamentos
    static async updateTought(req, res) {
        const id = req.params.id

        const tought = await Tought.findOne({ where: {id: id}, raw: true})

        console.log(tought)

        res.render('toughts/edit', {tought})

    }

    static async updateToughtSave(req, res) {

        const id = req.body.id
        console.log(id)

        const tought = {
            title: req.body.title
        }

        try {
            await Tought.update(tought, {where: {id: id}})
            req.flash('message', 'Pensamento atualizado com suceso!')

            // salvando e redirecionando
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })

        } catch (error) {
            console.log(error)
        }

    }

}
