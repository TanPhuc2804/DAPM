const express = require("express")
const authRouter = express.Router()
const { registerCus, login,logout } = require("../controller/auth.controller")
const {verifyLogin, verifyAdmin} = require("../services/jwt") 
authRouter.post('/registerCus', registerCus)
authRouter.post('/login', login)
authRouter.get('/verify',verifyLogin,(req,res)=>{
    return res.json({user: req.user})
})
authRouter.get('/verifyAdmin',verifyAdmin,(req,res)=>{
    return res.json({user: req.user})
})
authRouter.get('/logout',logout)


module.exports = authRouter