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
        console.log(toughts)

        res.render('toughts/dashboard', {toughts})
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

}
