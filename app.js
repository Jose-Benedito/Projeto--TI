const express = require("express");
const app = express(); //instânciando o express
const handlebars = require("express-handlebars");
const flash = require("connect-flash")
const session = require("express-session")
const bodyParser = require("body-parser") // para pegar os dados no formulário
const admin = require("./routes/admin")
const login = require("./models/login")
const cadastro = require("./models/cadastro") // carrega a model cadastro
const usuarios = require("./models/usuario") // carrega a model login
const passport = require("passport")
//Autenticação do login
const usuario = require("./routes/usuario")
require("./config/auth")(passport)


// Configurações (importante manter a ordem das chamadas)

// Sessão 
 app.use(session({
     secret: "jsbach",
     resave: true,
     saveUninitialized: true
 }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Middleware - filtro de rotas
app.use((req, res, next)=> {
    res.locals.success_msg = req.flash("success_msg")//variáveis globais com locals
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    next()
})





//Carregar o layout default do hendlebars (layout/main.handlebars)
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// para processar o formulário
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Rotas com handlebars
app.get('/cadastro', function(req, res){
    res.render('form'); //vai renderizar com a estrutura  do default
});

app.get('/login', function(req, res){
    res.render('usuario/login'); //vai renderizar com a estrutura  do default
});
app.use('/admin', admin)
app.use("/usuario", usuario)


// Rotas com Express
app.get('/', function(req, res){
    res.sendFile(__dirname + "/views/index.html");
});
app.get('/home', function(req, res){
    res.sendFile(__dirname + "/views/index.html");
});
app.get('/sobre', function(req, res){
    res.sendFile(__dirname + "/views/sobre.html");
});
app.get('/matricula', function(req, res){
    res.sendFile(__dirname + "/views/matricula.html");
});

// para acessar as pastas de
app.use(express.static(__dirname + "/assets"))
app.use(express.static(__dirname + "/views"))

// Processar os dados para enviar para o banco de dados
app.post('/add-cadastro', function(req, res){
    cadastro.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        senha2: req.body.senha2
    }).then(function(){
        
        res.redirect('/login')
        
    }).catch(function(erro){
        //  res.flash("error_msg")
        res.send("Erro: Não foi cadastrado com sucesso!" + erro)
    })
    
    //res.send("Nome: " + req.body.nome + "<br>Email: " + req.body.email + "<br>") 
})

app.post('/add-login', function(req, res){
    login.create({
        email: req.body.email,
        senha: req.body.senha
    }).then(function(){
        res.redirect('/cadastrados')
        
        
    }).catch(function(erro){
        res.send("Erro: Não foi cadastrado com sucesso!" + erro)
    })
    
    //res.send("Nome: " + req.body.email + "<br>Email: " + req.body.senha + "<br>") 
})
// Select
app.get('/cadastrados', function(req, res){

 cadastro.findAll().then(function(dados){

     //console.log(dados)
     res.render('cadastrados',{dados: dados}) 
     //vai listar os usuários cadastrados
 })

    
})
// Delete
app.get('/deletar/:id', function(req, res){
    cadastro.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Cadastro deletado com sucesso!")
    }).catch(function(erro){
        res.send("Este cadastro não existe!")
    })
})
app.listen(8080); //abre a porta 