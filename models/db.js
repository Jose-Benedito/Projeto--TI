const Sequelize = require("sequelize")

const sequelize = new Sequelize('my_node', 'root', '123',{ //base de dados, user e senha
    host: 'localhost',
    dialect: 'mariadb' //indicar o tipo de banco usado
});
// verifica  a conexão e se o banco de dado existe
sequelize.authenticate().then(function(){
    console.log('Conexão realizada com sucesso');

}).catch(function(err){
    console.log('Erro ao realizar a conexxão com BD:' + err);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}