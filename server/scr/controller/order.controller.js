const Order = require("../models/Order.model")

const insertOrder = async (req,res)=>{
    const idCus = req.user._id
    console.log(idCus)
    const stateOrder = 'waiting'
    const {shippingFee,totalPrice,paymentMethod,order_details,vouchers} = req.body
    let method= paymentMethod.trim()
    if(!shippingFee||!totalPrice||!paymentMethod||!order_details)
        return res.status(403).json({status:false,message:"Missing information of order"})
    if(method !== "Thanh toán bằng tiền mặt"){
        return res.status(200).json({status:true,message:"Thanh toán onl"})
    }

    try{
        const order = new Order({
            stateOrder:stateOrder,
            shippingFee:shippingFee,
            paymentMethod:method,
            totalPrice:totalPrice,
            idCustomer:idCus,
            order_details:order_details,
            vouchers:vouchers ?? []
        })

        await order.save()
        return res.status(200).json({status:true,message:"Order successfully !"})
    }catch(err){
        return res.status(500).json({status:false,message:err.message})
    }
}

const getListOrder = async (req,res)=>{
    try{
        const listOder = await Order.find({})
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
    getOrderForState
 }