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
    const { username, fullname, email, phone, address, gender, birthday } = req.body
    console.log({ username, fullname, email, phone, address,gender,birthday })
    if (!username || !fullname || !email || !phone || !address) {
        return res.status(403).json({ status: false, message: "Nhập đầy đủ thông tin !" })
    }

    try {
        const customer = await Customer.findById({
            _id: id
        })
        if (!customer) {
            return res.status(401).json({ status: false, message: "Không tìm thấy khách hàng !" })
        }
        customer.set({
            username: username,
            fullname: fullname,
            email: email,
            gender: gender,
            numberphone: phone,
            address: address,
            birthday: birthday
        })

        customer.save()
            .then(value => {
                return res.json({ status: true, message: "Cập nhật thành công !" })
            })
            .catch(err => {
                console.log(err.message ?? "Loi update")
                return res.status(403).json({ status: false, message: err.message })
            })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: false, message: "Error server" +err.message})

    }
}

const changePassword = async (req, res) => {
    const id = req.user._id
    const { oldPassword,newPassword } = req.body
    if (!newPassword) {
        return res.status(403).json({ status: false, message: "Input required !" })
    }

    const customer = await Customer.findById({_id:id})
    const checkPass = await bcrypt.compare(oldPassword,customer.password)
    if(!checkPass){
        return res.status(400).json({ status: false, message: "Mật khẩu hiện tại không khớp !" })
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)
    try {
        const customer = await Customer.findByIdAndUpdate({
            _id: id
        }, {
            password: hashPassword
        })

        if (!customer)
            return res.status(400).json({ status: false, message: "Thay đổi mật khẩu thất bại !" })
        return res.json({ status: true, message: "Thay đổi mật khẩu thành công !" })
    } catch (err) {
        return res.json({ status: false, message: "Error server" + err.message })
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

const checkQuantity = async (cart, product) => {

}

const insertProductToCard = async (req, res) => {
    const idCus = req.user._id
    if (!idCus)
        return res.status(401).json({ status: false, message: "Id disappointed !" })
    const { product, quantity, size } = req.body
    if (!product || !quantity || !size)
        return res.status(403).json({ status: false, message: "Input required !" })
    const cart = {
        productId: product._id,
        name: product.name,
        quantity: quantity,
        price: product.price,
        image: product.image[0],
        size: size
    }
    try {
        const customer = await Customer.findById({
            _id: idCus
        })
        const productDB = await Product.findOne({
            _id: product._id
        })
        const sizeInDB = productDB.productSizes.filter(item => item.size === size.size)
        if (sizeInDB < 0 || !sizeInDB) {
            return res.status(400).json({ status: false, message: "Không tìm thấy size" })
        }
        const sizeProduct = sizeInDB[0]
        const oldCart = customer.carts
        const index = oldCart.findIndex(item => item.productId == product._id && item.size.size === sizeProduct.size)
        let newCart = []
        if (index > -1) {
            oldCart[index].quantity += quantity
            if (oldCart[index].quantity > sizeProduct.quantity) {
                return res.status(400).json({ status: false, message: "Insufficient inventory" })
            }
            newCart = oldCart
        } else {
            productDB.productSizes.map((item, index) => {
                if (item.size === cart.size.size) {
                    if (item.quantity >= cart.quantity) {
                        newCart = [...oldCart, cart]
                    }
                }
            })

        }
        if(newCart.length <=0){
            return res.status(400).json({ status: false, message: "Không thêm vào giỏ hàng được" })

        }
        customer.set({
            carts: newCart
        })

        await customer.save()
        return res.status(200).json({ status: true, message: "Thêm giỏ hàng thành công !", carts: newCart })

    } catch (e) {
        return res.status(500).json({ status: false, message: e.message })
    }

}

const updateQuanityCart = async (req, res) => {
    const idCus = req.user._id // id customer
    const { idProduct, quantity, size } = req.body
    if (!idProduct || !quantity || !size) {
        res.status(403).json({ status: false, message: "Input required !" })
    }
    try {
        const customer = await Customer.findById({
            _id: idCus
        })
        const product = await Product.findById({ _id: idProduct })

        const sizeInDB = product.productSizes.filter(item => item.size === size.size)
        if (sizeInDB < 0 || !sizeInDB) {
            return res.status(400).json({ status: false, message: "Không tìm thấy size" })
        }
        const sizeProduct = sizeInDB[0]
        const quantityStore = sizeProduct.quantity
        if (!customer)
            return res.status(404).json({ status: false, message: "Customer not found" })

        const carts = customer.carts
        const index = carts.findIndex(item => item.productId == idProduct && item.size.size === sizeProduct.size)
        if (quantityStore < quantity) {
            return res.status(400).json({ status: false, message: "Số lượng không đủ" })
        }
        if (quantity < 1) {
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

const deleteCart = async (req, res) => {
    const { size } = req.body
    if (!size) {
        return res.status(403).json({ status: false, message: "Input required !" })
    }
    const idProduct = req.params.id
    const idCus = req.user._id
    const customer = await Customer.findById({ _id: idCus })
    const carts = customer.carts
    const newCarts = carts.filter((item => {
        if (item.productId == idProduct) {
            if (item.size.size != size.size) {
                return true
            } else {
                return false
            }
        }
        return true

    }))
    customer.set({
        carts: newCarts
    })
    await customer.save()

    return res.json({ status: true, message: "Delete successful !" })
}

const blockCustomer = async (req, res) => {
    const idCus = req.params.id
    if (!idCus)
        res.status(403).json({ status: false, message: "Bị mất dữ liệu !" })
    const role = "block"
    const customer = await Customer.findById({ _id: idCus })
    customer.set({
        role: role
    })
    await customer.save()
    return res.json({ status: true, message: "Khóa người dùng thành công" })
}
const unblockCustomer = async (req, res) => {
    const idCus = req.params.id
    if (!idCus)
        res.status(403).json({ status: false, message: "Bị mất dữ liệu !" })
    const role = "Customer"
    const customer = await Customer.findById({ _id: idCus })
    customer.set({
        role: role
    })
    await customer.save()
    return res.json({ status: true, message: "Gỡ khóa người dùng thành công" })
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