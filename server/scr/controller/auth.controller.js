const bcrypt = require('bcrypt')
const { generalAccessToken } = require("../services/jwt")
const Customer = require("../models/Customer.model")
const Staff = require("../models/Staff.model")
const nodemailer = require("nodemailer")
const { generateOTP } = require('../services/otpServices')

const registerCus = async (req, res) => {
    const { fullname, username, email, password } = req.body
    if (!fullname || !username || !email || !password) {
        return res.status(400).json({ status: false, message: "Input required !" })
    }
    const existedCus = await Customer.findOne({
        email: email
    })
    if (existedCus) {
        return res.status(403).json({ status: false, message: "Email đã tồn tại !" })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    try {
        const newCustomer = new Customer({
            fullname: fullname,
            email: email,
            password: hashPassword,
            username: username
        })

        await newCustomer.save()
        return res.status(200).json({ status: true, message: "Register customer successful !" })
    } catch (e) {
        return res.status(401).json({ status: false, message: "Lỗi hệ thống:", errr: e.message })
    }


}

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ status: false, message: "Input required !" })
    }

    const customer = await Customer.findOne({
        username: username
    })

    if (customer) {
        let checkPassword = await bcrypt.compare(password, customer.password)
        if (!checkPassword) {
            return res.status(400).json({ status: false, message: "Wrong password !" })
        }

        if (customer.role === "block") {
            return res.status(400).json({ status: false, message: "Người dùng đã bị khóa" })
        }

        let access_token = await generalAccessToken({
            _id: customer._id,
            fullname: customer.fullname,
            email: customer.email,
            numberphone: customer.numberphone,
            gender: customer.gender,
            address: customer.address,
            voucher: customer.vouchers,
        })

        return res.cookie("token", access_token, { httpOnly: true, secure: true })
            .json({
                status: true,
                redirect: "/",
                message: "Login Successful",
                fullanme: customer.fullname,
                email: customer.email,
                id: customer._id,
            })
    }

    const staff = await Staff.findOne({
        username: username
    })

    if (staff) {
        let checkPassword = await bcrypt.compare(password, staff.password)
        if (!checkPassword) {
            return res.status(400).json({ status: false, message: "Wrong password !" })
        }

        let access_token = await generalAccessToken({
            _id: staff._id,
            fullname: staff.fullname,
            email: staff.email,
            numberphone: staff.numberphone,
            gender: staff.gender,
            address: staff.address,
            voucher: staff.vouchers,
            role: staff.role
        })

        return res
            .cookie("token", access_token, { httpOnly: true, secure: true })
            .json({
                status: true,
                redirect: "/admin",
                message: "Login staff Successful"
            })
    }

    return res.status(404).json({ status: false, message: "You haven’t registered yet" })
}

const logout = async (req, res) => {
    res.clearCookie('token')
    return res.json({ logout: true })
}

const sendOTP = async (req, res) => {
    const email = req.user.email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'phantanphuc282004@gmail.com',
            pass: 'hsgtposfpndltoec',
        },
    })
    if (!email)
        return res.status(404).json({ message: "Email không tồn tại !" })

    const otpRandom = generateOTP()

    const mailOptions = {
        from: "phantanphuc282004@gmail.com",
        to: email,
        subject: "Xác nhận mã OTP",
        html: `<p> Mã OTP của bạn là: <b>${otpRandom}</b> có thời gian là 5 phút </p>`
    }

    try{
        transporter.sendMail(mailOptions, async (err,infor)=>{
            const hashOTP = await bcrypt.hash(otpRandom,10)
            if(err)
                return res.status(400).json({status:false,message:"Gửi OTP thất bại"})
            return res.cookie("otp",hashOTP,{
                maxAge: 5*60 * 1000 ,// cookie tự động xóa sau 5p
                httpOnly:true,
                secure:true
            }).json({status:true,message:"Mã OTP đã gửi đến bạn vui lòng kiểm tra Gmail và xác thực"})
        })
    }catch(err){
        return res.status(500).json({status:false,message:err.message})
    }

}


const sendOTPCreated= async (req, res)=>{
    const email = req.body.email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'phantanphuc282004@gmail.com',
            pass: 'hsgtposfpndltoec',
        },
    })
    if (!email)
        return res.status(404).json({ message: "Email không tồn tại !" })

    const otpRandom = generateOTP()

    const mailOptions = {
        from: "phantanphuc282004@gmail.com",
        to: email,
        subject: "Xác nhận mã OTP",
        html: `<p> Mã OTP của bạn là: <b>${otpRandom}</b> có thời gian là 5 phút </p>`
    }

    try{
        transporter.sendMail(mailOptions, async (err,infor)=>{
            const hashOTP = await bcrypt.hash(otpRandom,10)
            if(err)
                return res.status(400).json({status:false,message:"Gửi OTP thất bại"})
            return res.cookie("otp",hashOTP,{
                maxAge: 5*60 * 1000 ,// cookie tự động xóa sau 5p
                httpOnly:true,
                secure:true
            }).json({status:true,message:"Mã OTP đã gửi đến bạn vui lòng kiểm tra Gmail và xác thực"})
        })
    }catch(err){
        return res.status(500).json({status:false,message:err.message})
    }

}

const verifyOTP = async (req, res) => {
    const {inputOTP} = req.body
    if(!inputOTP)
        return res.status(403).json({message:"Vui lòng nhập mã OTP"})
    if(inputOTP.length !=6)
        return res.status(400).json({message:"Mã OTP có độ dài là 6 chữ số"})
    const otp = req.cookies.otp
    
    if(!otp)
        return res.status(400).json({message:"Mã OTP đã hết hạn hoặc đã xác thực thành công"})
    const checkOTP = await bcrypt.compare(inputOTP,otp)
    if(!checkOTP)
        return res.status(400).json({status:false,message:"Mã OTP không đúng"})
    
    return res.clearCookie("otp").json({status:true,message:"Xác thực OTP thành công"})
}
module.exports = {
    registerCus,
    login,
    logout,
    sendOTP,
    sendOTPCreated,
    verifyOTP
}