require("dotenv").config()
const stripe = require("stripe")(process.env.SECRET_KEY_CHECKOUT)
const Order = require("../models/Order.model")
const checkoutProcess = async(req,res)=>{
    const emailCus = req.user.email
    const idCus = req.user._id
    const cart = req.body
    const line_items = cart?.map((item)=>(
        {  
            price_data:{
                currency:'vnd',
                product_data:{
                    name:item.name,
                    metadata:{
                        productId:item._id,
                        size:item.size
                    },
                },
                unit_amount:item.price
            },
            quantity:item.quantity
        }
    ))
    try{
        const session = await stripe.checkout.sessions.create({
            line_items:line_items ,
            client_reference_id:idCus,
            customer_email:emailCus,
            shipping_address_collection:{
                allowed_countries:['VN']
            },  
            mode:"payment",
            success_url:"http://localhost:5001/success/{CHECKOUT_SESSION_ID}",
            cancel_url:"http://localhost:5001/cancel"
        })
        return res.json({status:false,message:session})
    }catch(err){
        return res.json({status:false,message:err.message})
         
    }
   
}
const completeCheckout = async(req,res)=>{
    const idCus = req.user._id
    const session_id = req.params.session_id
    if(!session_id){
        return res.status(404).json({status:false,message:"Missing session_id !"})
    }
    try{
        const session = await stripe.checkout.sessions.retrieve(session_id,{ expand: ["line_items.data.price.product"]})
        const stateOrder = "comfirmed"
        const customer_detail = session.customer_details
        const totalPrice = session.amount_total
        const address_shipping= customer_detail.address?.line1;
        const shippingFee =0
        const paymentMethod ="Chuyển Khoản"
        const lineItems = await session?.line_items?.data ?? []
        console.log("[LINEITEMS DETAIL]",lineItems)
        const orderDetail = lineItems?.map((item,index)=>{
            return{
                _idProduct: item?.price.product?.metadata.productId,
                name:item.description,
                quantity:item.quantity,
                price: item.price.unit_amount,
                size: item?.price.product?.metadata.size
            }
        })

        const order = new Order({
            stateOrder:stateOrder,
            shippingFee:shippingFee,
            paymentMethod:paymentMethod,
            totalPrice:totalPrice,
            idCustomer:idCus,
            order_details:orderDetail,
            address_shipping:address_shipping??"",
        })

        await order.save()
        return res.json({status:true,message:"Order successful !"})
    }catch(err){
        return res.json({status:false,message:err.message})
    }
    
}
module.exports ={
    checkoutProcess,
    completeCheckout
}