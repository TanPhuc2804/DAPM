const express = require("express")
const authRouter = express.Router()
const { registerCus, login,logout,sendOTP,verifyOTP,sendOTPCreated } = require("../controller/auth.controller")
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

authRouter.get('/send-otp',verifyLogin,sendOTP)

authRouter.post('/send-otp-create',sendOTPCreated)
authRouter.post('/verify-otp',verifyOTP)

module.exports = authRouter