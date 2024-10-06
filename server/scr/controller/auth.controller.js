const bcrypt = require('bcrypt')
const { generalAccessToken } = require("../services/jwt")
const Customer = require("../models/Customer.model")
const Staff = require("../models/Staff.model")

const registerCus = async (req, res) => {
    const { fullname, username, email, password } = req.body
    if (!fullname || !username || !email || !password) {
        return res.status(400).json({ status: false, message: "Input required !" })
    }
    const existedCus = await Customer.findOne({
        email: email
    })
    if (existedCus) {
        return res.status(403).json({ status: false, message: "Email exisited !" })
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
        return res.status(401).json({ status: false, message: "Username is existed", errr: e.message })

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
                message: "Login Successful"
            })
    }

    const staff = await Staff.findOne({
        username: username
    }) 

    if(staff){
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

    return res.status(404).json({status:false, message:"You haven’t registered yet"})
}

module.exports = {
    registerCus,
    login
}