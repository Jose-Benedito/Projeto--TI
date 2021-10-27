const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/usuario")
const usuario = mongoose.model("usuario")

router.get("/registro", (req,res)=>{
    res.render("usuario/registro")
})



module.exports = router