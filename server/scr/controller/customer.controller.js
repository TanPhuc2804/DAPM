const bcrypt = require("bcrypt")
const Customer = require('../models/Customer.model')

const getListCustomer = async (req, res) => {
    const listCustomer = await Customer.find({})
    if (!listCustomer)
        return res.status(400).json({ status: true, message: "Get list customer successful !" })
    return res.json({ status: true, message: listCustomer })
}

const getCustomerByID = async (req, res) => {
    const id = req.params.id
    if (!id)
        return res.status(403).json({ status: false, message: "Not found ID" })
    const listCustomer = await Customer.findById({
        _id: id
    })
    if (!listCustomer)
        return res.status(400).json({ status: true, message: "Get list customer successful !" })
    return res.json({ status: true, message: listCustomer })
}

const updateCustomer = async (req, res) => {
    const id = req.params.id
    const { username, fullname, email, numberphone, nation, area, district } = req.body
    if (!username || !fullname || !email || !numberphone || !nation || !area || !district) {
        return res.status(403).json({ status: false, message: "Input required !" })
    }

    try {
        const customer = await Customer.findById({
            _id: id
        })
        if (!customer) {
            return res.status(401).json({ status: false, message: "Customer not found !" })
        }

        const dataAddress = customer.address
        let newAddress = ""
        if (dataAddress !== undefined) {
            let address = dataAddress.split(',')
            if (address.length > -1) {
                newAddress = address[0] + `, Q${district}, ${area}`
            } else {
                newAddress = `,Q${district}, ${area}`
            }
        } else {
            newAddress = `Q${district}, ${area}`
        }

        customer.set({
            username: username,
            fullname: fullname,
            email: email,
            numberphone: numberphone,
            address: newAddress
        })

        customer.save()
            .then(value => {
                return res.json({ status: true, message: "Update successfull !" })
            })
            .catch(err => {
                console.log(err.message ?? "Loi update")
                return res.status(403).json({ status: false, message: err.message })
            })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, message: "Error server" })

    }


}

const changePassword = async (req, res) => {
    const { password } = req.body
    if (!password) {
        return res.status(403).json({ status: false, message: "Input required !" })

    }
    const newPassword = await bcrypt.hash(password, 10)
    try {
        const customer = await Customer.findByIdAndUpdate({
            _id: id
        }, {
            password: newPassword
        })

        if (!customer)
            return res.status(404).json({ status: false, message: "Change pass failed !" })
        return res.json({ status: true, message: "Change password successful !" })
    } catch (err) {
        return res.json({ status: false, message: "Error server" })
    }
}

const getListCart = async (req, res) => {
    console.log(req.params)
    const id = req.params.id
    if (!id || id === ':id')
        return res.status(401).json({ status: false, message: "Id disappointed !" })
    try {
        const customer = await Customer.findById({
            _id: id
        })
        if (!customer)
            return res.status(404).json({ status: false, message: "Customer not found !" })
        console.log(customer.carts)
        const cart = customer.carts
        return res.status(200).json({ status: true, message: "Get cart successfully !", cart: cart })
    } catch (e) {
        return res.status(500).json({ status: false, message: e.message })
    }
}

const insertProductToCard = async (req, res) => {
    const idCus = req.params.id
    if (!idCus || idCus === ':id')
        return res.status(401).json({ status: false, message: "Id disappointed !" })
    const { idProduct, quantity, price } = req.body

    if (!idProduct || !quantity || !price)
        return res.status(403).json({ status: false, message: "Input required !" })

    const cart = {
        productId: idProduct,
        quantity: quantity,
        price: price
    }

    try{
        const customer = await Customer.findById({
            _id: idCus
        })
        const oldCart = customer.carts
        const newCart = [...oldCart,cart]

        c

    }catch(e){
        return res.status(500).json({ status: false, message: e.message })

    }


}
module.exports = {
    getListCustomer,
    getCustomerByID,
    updateCustomer,
    changePassword,
    getListCart,
    insertProductToCard,

}