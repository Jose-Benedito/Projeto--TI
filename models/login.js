const db = require('./db')

const login = db.sequelize.define('login', {
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    }
})

//Criar a tabela
//login.sync({force: true})

module.exports = login