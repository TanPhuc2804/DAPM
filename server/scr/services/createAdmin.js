const bcrypt = require('bcrypt')
const Staff = require('../models/Staff.model')
const createAdmin = async ()=>{
    const countAdmin = await Staff.countDocuments({})
    if(countAdmin > 0){
        return
    }
    try{
        const hashPassword = await bcrypt.hash("admin123",10)
        const newAdmin = new Staff({
            username: "admin123",
            email: "admin@gmail.com",
            password: hashPassword,
            fullname:"Nguyen Van A",
            role:"66f8e28b66c55d58fcc3c03f"
        })
    
        await newAdmin.save()
    
        console.log("Create Admin successfull")
    }catch(err){
        console.log(err.message)
    }
   
}


module.exports = createAdmin