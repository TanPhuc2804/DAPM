const Order = require("../models/Order.model")
const Product = require("../models/Product.model")
const Customer = require("../models/Customer.model")
const updateCarts = async (idCus)=>{
    const customer = await Customer.findById({_id:idCus})
    customer.set({
        carts:[]
    })
    await customer.save()
}

const updateQuantity = async (idP,quantityOrder)=>{
    const product = await Product.findById({
        _id:idP
    })
    const quantity = product.quantity-quantityOrder
    product.set({
        quantity: quantity,
    })
    await product.save()
}

const insertOrder = async (req,res)=>{
    const idCus = req.user._id
    const stateOrder = 'waiting'
    const { infor, cart } = req.body
    let method= "Thanh toán bằng tiền mặt"
    totalPrice = cart.reduce((acc,item)=>acc+item.price*item.quantity,0)
    cart.map(async (item)=>{
        await updateQuantity(item.productId,item.quantity)
    })
    
    const orderDetail = cart.map((item) => {
        return {
            _idProduct: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            size: item.size
        }
    })

    try{
        const order = new Order({
            stateOrder:stateOrder,
            shippingFee:0,
            paymentMethod:method,
            totalPrice:totalPrice,
            idCustomer:idCus,
            order_details:orderDetail,
            delivery_detail: {
                name: infor.firstName+" "+infor.lastName,
                address_shipping: infor.address ?? "",
                phone:infor.phonenumber,
                email:infor.email
            },
            vouchers:[]
        })

        await order.save()
        updateCarts(idCus)
        return res.status(200).json({status:true,message:"Order successfully !"})
    }catch(err){
        console.log(err.message)
        return res.status(500).json({status:false,message:err.message})
    }
}

const getListOrder = async (req,res)=>{
    try{
        const listOder = await Order.find({}).populate('idCustomer')
        return res.status(200).json({status:true,message:"Order successfully !",order:listOder})
    }catch(err){
        return res.status(500).json({status:false,message:err.message})
    }
}

const getListOrderOfCus = async (req,res)=>{
    const idCus = req.user._id
    try{
        const listOder = await Order.find({
            idCustomer:idCus
        })
        return res.status(200).json({status:true,message:"Order successfully !",order:listOder})
    }catch(err){
        return res.status(500).json({status:false,message:err.message})
    }

}

const updateState = async (req,res)=>{
    const idOrder = req.params.id
    const {stateOrder} = req.body
    if(!idOrder)
        return res.status(403).json({status:false,message:"Missing id of order"})
    if(!stateOrder)
        return res.status(403).json({status:false,message:"Missing state of order"})
    try{
        const order = await Order.findById({
            _id:idOrder
        })

        await order.set({
            stateOrder:stateOrder
        }).save()
        return res.status(200).json({status:true,message:"Change state successfully !",order:order})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})
    }
}

const getOrderForState = async (req,res) =>{
    const {stateOrder} = req.body 
    if(!stateOrder)
        return res.status(403).json({status:false,message:"Missing state of order"})

    try{
        const order = await Order.find({
            stateOrder:stateOrder
        })
        return res.status(200).json({status:true,message:"Change state successfully !",order:order})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})
    }
}

const getOrderForStateCus = async (req,res) =>{
    const idCus = req.user._id
    const {stateOrder} = req.body 
    if(!stateOrder)
        return res.status(403).json({status:false,message:"Missing state of order"})

    try{
        const order = await Order.find({
            idCustomer:idCus,
            stateOrder:stateOrder
        })
        return res.status(200).json({status:true,message:"Change state successfully !",order:order})

    }catch(err){
        return res.status(500).json({status:false,message:err.message})
    }
}
 module.exports={
    insertOrder,
    getListOrder,
    getListOrderOfCus,
    updateState,
    getOrderForState,
    getOrderForStateCus
 }