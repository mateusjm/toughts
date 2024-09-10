// importando pacotes
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')

// salvar as sessões da pasta session
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

// criando o app
const app = express()

// importando conexão
const conn = require('./db/conn')

// importando models
const Tought = require('./models/Tought')
const User = require('./models/User')

// importando routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// importando controller
const ToughtController = require('./controllers/ToughtController')

// definindo template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// receber resposta do body
app.use(
    express.urlencoded({
        extended: true
    })
)

// app.use(express.json)

// session middleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)

// configuração flash messages
app.use(flash())

// uso de arquivo estáticos
app.use(express.static(__dirname + '../../' + '/public'))

// configurar sessão na resposta
app.use((req, res, next)=> {

    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

// Routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

// acessando todos os pensamentos pela barra
app.get('/', ToughtController.showToughts)

// criando conexão no índice
conn
    .sync()
    .then(()=> {
        app.listen(3000)
    })
    .catch((err)=> console.log(err))

