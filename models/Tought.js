// importando tipo de dados
const {DataTypes} = require('sequelize')

// importando conexão
const db = require('../db/conn')

// importando User
const User = require('./User')

// definindo Tought
const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

// definindo Tought como pertencente a User
Tought.belongsTo(User)
// Usuário possui muitos pensamentos
User.hasMany(Tought)

// exportando Tought
module.exports = Tought