const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const Staff = require("../models/Staff.model")
const  Role = require("../models/Role.model")
const generalAccessToken= async (payload)=>{
    const access_token = await jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:"24h"})
    return access_token
}


const verifyLogin = async (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const decode = await jwt.verify(token,process.env.ACCESS_TOKEN)
    const userPayload = decode
    req.user = userPayload
    next()
}

const verifyAdmin = async (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const decode = await jwt.verify(token,process.env.ACCESS_TOKEN)
    const idUser = decode._id
    const checkStaff = await Staff.findById({
        _id:idUser
    })

    if(!checkStaff)
        return res.status(401).json({message:"You aren't an staff !"})
    
    const role = await Role.findById({
        _id: checkStaff.role
    })

    const nameRole =role.name

    if(nameRole !== 'Admin' ){
        return res.status(401).json({message:"You aren't an admin !"})
    }
    const userPayload = decode
    req.user = {...userPayload,role:"admin"}
    next()
}

module.exports={
    generalAccessToken,verifyLogin,verifyAdmin
}