
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/usuario")
const usuario = mongoose.model("usuario")
const passport = require("passport")

router.get("/registro", (req,res)=>{
    res.render("usuario/registro")
})

router.post("/registro", (req, res) =>{
    var erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"})
    }
    if(req.body.senha.length < 4){
        erros.push({texto:"Senha muito curta"})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto:"As senhas são diferentes, tente novamente"})
    }

    if(erros.length > 0){
        res.render("usuario/registro", {erros: erros})

    }else{

    }
})
//Autenticaçãoe redirecionamento de página
router.get("/login", (req, res, next)=>{
    res.render("usuario/login")
})
router.post("/login", (req, res, next)=>{
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/usuario/login",
        failureFlash: true
    })(req, res, next)

})
module.exports = router