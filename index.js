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

// criando conexão no índice
conn
    .sync()
    .then(()=> {
        app.listen(3000)
    })
    .catch((err)=> console.log(err))

