// importando tipo de dados
const {DataTypes} = require('sequelize')

// importando conexão
const db = require('../db/conn')

// definindo User
const User = db.define('User', {
    name : {
        type: DataTypes.STRING,
        require: true
    },
    email : {
        type: DataTypes.STRING,
        require: true
    },
    password : {
        type: DataTypes.STRING,
        require: true
    },

})

// exportando User
module.exports = User