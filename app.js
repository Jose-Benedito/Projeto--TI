const express = require("express");
const app = express(); //instânciando o express
const handlebars = require("express-handlebars");

const bodyParser = require("body-parser") // para pegar os dados no formulário
const cadastro = require("./models/cadastro") // carrega a model cadastro
const login = require("./models/login") // carrega a model login
const passport = require("passport");
//Autenticação do login
const usuarios = require("./routes/usuario")
const { Passport } = require("passport");
require("./config/auth")(Passport)
// Configurações

// Sessão
 app.use(session({
     secret: "jsbach",
     resave: true,
     saveUninitializaed: true
 }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Middleware
app.use((req, res, next)=> {
    res.locals.success_mg = req.flash("success_mg")
    res.locals.error_mg = req.flash("error_mg")
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

app.get('/cadastrados', function(req, res){
    res.render('cadastrados'); //vai renderizar com a estrutura  do default
});
app.use('/admin', admin)
app.use("/usuarios", usuarios)


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
        email: req.body.email
    }).then(function(){
        res.redirect('/cadastrados')
        res.send("cadastrado com sucesso!")
    }).catch(function(erro){
        res.send("Erro: Não foi cadastrado com sucesso!" + erro)
    })
    res.send("Nome: " + req.body.nome + "<br>Email: " + req.body.email + "<br>") 
})

app.post('/add-login', function(req, res){
    login.create({
        email: req.body.email,
        senha: req.body.senha
    }).then(function(){
        
        res.redirect('/home')
        res.send("Login realizado com sucesso!")
    }).catch(function(erro){
        res.send("Erro: Não foi cadastrado com sucesso!" + erro)
    })
    res.send("Nome: " + req.body.email + "<br>Email: " + req.body.senha + "<br>") 
})

app.listen(8080); //abre a porta 