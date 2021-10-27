const express = require("express");
const app = express(); //instânciando o express
const handlebars = require("express-handlebars");
const flash = require("connect-flash")
const session = require("express-session")
const bodyParser = require("body-parser") // para pegar os dados no formulário
const admin = require("./routes/admin")
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
//app.use('/admin', admin)
//app.use("/usuario", usuarios)
app.get('/admin', function(req, res){
    res.render('usuario/admin');
});
app.get('/usuario', function(req, res){
    res.render('usuario/registro');
});

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