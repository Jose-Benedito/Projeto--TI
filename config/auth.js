const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// Model de usuário
require("../models/login")
const login = mongoose.model("login")


module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'email'}, (email, senha, done)=> {
        login.findOne({email: email}).then((login)=> {
            if(!login){

                return done(null, false, {message: "Esta conta não existe"})

            }

            bcrypt.compare(senha, login.senha, (erro, batem)=> {
                if(batem){
                    return done(null, user)
                }else{
                return done (null, false, {message: "Senha incorreta"})
             }
            })
        
        })
    }))
    // salvar os dados na sessão
    passport.serializaUser((user, done)=> {
        done(null, login.id)
    })

    passport.deserializeUser((id,nome)=> {
        User.findOne(id, (err, login)=> {
            done(err, user)
        })
    })


}