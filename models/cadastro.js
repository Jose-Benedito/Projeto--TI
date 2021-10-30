const db = require('./db')

const cadastro = db.sequelize.define('cadastro', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha:{
        type: db.Sequelize.STRING
    },
    senha2:{
        type: db.Sequelize.STRING
    }
})

//Criar a tabela ( executar o comando abaixo uma única vez)
//cadastro.sync({force: true})

module.exports = cadastro