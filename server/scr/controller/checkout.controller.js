require("dotenv").config()
const stripe = require("stripe")(process.env.SECRET_KEY_CHECKOUT)
const { info } = require("console")
const Order = require("../models/Order.model")
const Product = require("../models/Product.model")
const Customer = require("../models/Customer.model")
const checkoutProcess = async (req, res) => {
    const { infor, cart } = req.body
    const idCus = req.user._id
    const inforJson = JSON.stringify(infor);
    const encodedInforJson = encodeURIComponent(inforJson);
    const line_items = cart?.map((item) => (
        {
            price_data: {
                currency: 'vnd',
                product_data: {
                    name: item.name,
                    metadata: {
                        productId: item.productId,
                        size: item.size.size
                    },
                },
                unit_amount: item.price
            },
            quantity: item.quantity
        }
    ))
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            client_reference_id: idCus,
            customer_email: infor.email,
            mode: "payment",
            success_url: `http://localhost:5001/success/{CHECKOUT_SESSION_ID}?infor=${encodedInforJson}`,
            cancel_url: "http://localhost:5001/cancel"
        })
        return res.json({ status: true, message: session.url })
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })

    }

}

const updateQuantity = async (idP, quantity,size) => {
    try{
        await Product.updateOne(
            {_id:idP,"productSizes.size":size},
            { $inc: { "productSizes.$.quantity": -quantity} }
        )

    }catch(err){
        console.log(err)
    }
}
const updateCarts = async (idCus)=>{
    const customer = await Customer.findById({_id:idCus})
    console.log(idCus)
    customer.set({
        carts:[]
    })
    await customer.save()
}

const completeCheckout = async (req, res) => {
    const idCus = req.user._id
    const {firstName,lastName,address,email,phonenumber} = req.body
    const session_id = req.params.session_id
    if (!session_id) {
        return res.status(404).json({ status: false, message: "Missing session_id !" })
    }
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ["line_items.data.price.product"] })
        const stateOrder = "paymented"
        const totalPrice = session.amount_total
        const shippingFee = 0
        const paymentMethod = "Chuyển Khoản"
        const lineItems = await session?.line_items?.data ?? []

        lineItems?.map(async (item)=>{
           await updateQuantity(item?.price.product?.metadata.productId, item.quantity, item?.price.product?.metadata.size)
        })
        const orderDetail = lineItems?.map((item, index) => {
            return {
                _idProduct: item?.price.product?.metadata.productId,
                name: item.description,
                quantity: item.quantity,
                price: item.price.unit_amount,
                size: item?.price.product?.metadata.size
            }
        })
        const order = new Order({
            stateOrder: stateOrder,
            shippingFee: shippingFee,
            paymentMethod: paymentMethod,
            totalPrice: totalPrice,
            idCustomer: idCus,
            order_details: orderDetail,
            delivery_detail: {
                name: firstName+" "+lastName,
                address_shipping: address ?? "",
                phone:phonenumber,
                email:email
            }
        })
        await order.save()
        updateCarts(idCus)
        return res.json({ status: true, message: "Đặt hàng thành công !" })
    } catch (err) {
        return res.json({ status: false, message: err.message })
    }

}
module.exports = {
    checkoutProcess,
    completeCheckout
}