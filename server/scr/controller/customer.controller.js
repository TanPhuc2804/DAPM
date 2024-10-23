const bcrypt = require("bcrypt")
const Customer = require('../models/Customer.model')
const Product = require("../models/Product.model")

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
    const id = req.user._id
    if (!id || id === ':id')
        return res.status(401).json({ status: false, message: "Id disappointed !" })
    try {
        const customer = await Customer.findById({
            _id: id
        })
        if (!customer)
            return res.status(404).json({ status: false, message: "Customer not found !" })
        const cart = customer.carts
        return res.status(200).json({ status: true, message: "Get cart successfully !", cart: cart })
    } catch (e) {
        return res.status(500).json({ status: false, message: e.message })
    }
}

const insertProductToCard = async (req, res) => {
    const idCus = req.user._id
    if (!idCus)
        return res.status(401).json({ status: false, message: "Id disappointed !" })
    const { product, quantity,size } = req.body
    if (!product || !quantity)
        return res.status(403).json({ status: false, message: "Input required !" })

    console.log(product.image[0])
    const cart = {
        productId: product._id,
        name:product.name,
        quantity: quantity,
        price: product.price,
        image:product.image[0],
        size:size
    }
    try {
        const customer = await Customer.findById({
            _id: idCus
        })
        const productDB = await Product.findById({ _id: product._id })
        const oldCart = customer.carts

        const index = oldCart.findIndex(item => item.productId == product._id)
        let newCart = []
        if (index > -1) {
            oldCart[index].quantity += quantity
            if (oldCart[index].quantity > productDB.quantity) {
                return res.status(400).json({ status: false, message: "Insufficient inventory" })
            }
            newCart = oldCart
        } else {
            newCart = [...oldCart, cart]
        }
        customer.set({
            carts: newCart
        })

        await customer.save()
        return res.status(200).json({ status: true, message: "Insert into cart successful !", carts: newCart })

    } catch (e) {
        return res.status(500).json({ status: false, message: e.message })
    }

}

const updateQuanityCart = async (req, res) => {
    const idCus = req.user._id // id customer
    const { idProduct, quantity } = req.body
    if (!idProduct || !quantity) {
        res.status(403).json({ status: false, message: "Input required !" })
    }
    try {
        const customer = await Customer.findById({
            _id: idCus
        })
        const product = await Product.findById({ _id: idProduct })
        const quantityStore = product.quantity
        if (!customer)
            return res.status(404).json({ status: false, message: "Customer not found" })
        const carts = customer.carts
        const index = carts.findIndex(item => item.productId == idProduct)
        if (quantityStore < quantity) {
            return res.status(400).json({ status: false, message: "Số lượng không đủ" })
        }
        if(quantity < 1){
            return res.status(400).json({ status: false, message: "Số lượng phải lớn hơn 0" })

        }
        carts[index].quantity = quantity
        customer.set({
            carts: carts
        })
        await customer.save()
        return res.status(200).json({ status: true, message: "Thay đổi số lượng thành công !", carts: carts })
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
}

const deleteCart = async (req,res)=>{
    const idProduct = req.params.id 
    const idCus = req.user._id
    const customer = await Customer.findById({_id:idCus})
    const carts = customer.carts
    const newCarts = carts.filter((item=>(item.productId != idProduct)))
    customer.set({
        carts:newCarts
    })
    await customer.save()

    return res.json({status:true,message:"Delete successful !"})
}

const blockCustomer = async(req,res)=>{
    const idCus = req.params.id
    if(!idCus)
        res.status(403).json({ status: false, message: "Bị mất dữ liệu !" })
    const role = "block"
    const customer = await Customer.findById({_id:idCus})
    customer.set({
        role:role
    })
    await customer.save()
    return res.json({status:true, message:"Khóa người dùng thành công"})
}
const unblockCustomer = async(req,res)=>{
    const idCus = req.params.id
    if(!idCus)
        res.status(403).json({ status: false, message: "Bị mất dữ liệu !" })
    const role = "Customer"
    const customer = await Customer.findById({_id:idCus})
    customer.set({
        role:role
    })
    await customer.save()
    return res.json({status:true, message:"Gỡ khóa người dùng thành công"})
}
module.exports = {
    getListCustomer,
    getCustomerByID,
    updateCustomer,
    changePassword,
    getListCart,
    insertProductToCard,
    updateQuanityCart,
    deleteCart,
    blockCustomer,
    unblockCustomer
}