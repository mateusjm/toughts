// importando sequelize
const { Sequelize } = require('sequelize')

// criando conexão com banco de dados Toughts
const sequelize = new Sequelize('toughts', 'root', '2020', {
    host: 'localhost',
    dialect: 'mysql'
})

// autenticando a conexão
try {
    sequelize.authenticate()
    console.log('Conectado ao MySQL!')
} catch (err) {
    console.log(`Não foi possível conectar: ${err}`)
}

// exportando a conexão sequelize
module.exports = sequelize