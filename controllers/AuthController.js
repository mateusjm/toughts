module.exports = class AuthContoller {

    // login
    static login(req, res) {
        res.render('auth/login')
    }

    // registrar
    static register(req, res) {
        res.render('auth/register')
    }

}