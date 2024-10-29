require("dotenv").config()
const stripe = require("stripe")(process.env.SECRET_KEY_CHECKOUT)
const { info } = require("console")
const Order = require("../models/Order.model")
const Product = require("../models/Product.model")
const Customer = require("../models/Customer.model")
const Voucher = require("../models/Voucher.model")
const checkoutProcess = async (req, res) => {
    let { infor, cart, voucher } = req.body
    const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    const discountPercentage = voucher?.discount ??0
    const discountAmount = (totalAmount * discountPercentage) / 100
    const idCus = req.user._id
    if(voucher.discount){
        infor = {
            ...infor,
            voucher:voucher
        }
        console.log(infor)
    }
    const inforJson = JSON.stringify(infor);
    const encodedInforJson = encodeURIComponent(inforJson);
    const line_items = cart?.map((item) => {
        const itemTotal = item.price * item.quantity; // Tính tổng cho sản phẩm
        const itemDiscount = ((itemTotal / totalAmount) * discountAmount) / item.quantity;
        return {
            price_data: {
                currency: 'vnd',
                product_data: {
                    name: item.name,
                    metadata: {
                        productId: item.productId,
                        size: item.size.size
                    },
                },
                unit_amount:itemDiscount ===0 ? item.price :  item.price - itemDiscount 
            },
            quantity: item.quantity
        }
    })
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

const updateQuantity = async (idP, quantity, size) => {
    try {
        await Product.updateOne(
            { _id: idP, "productSizes.size": size },
            { $inc: { "productSizes.$.quantity": -quantity } }
        )

    } catch (err) {
        console.log(err)
    }
}
const updateCarts = async (idCus) => {
    const customer = await Customer.findById({ _id: idCus })
    console.log(idCus)
    customer.set({
        carts: []
    })
    await customer.save()
}

const completeCheckout = async (req, res) => {
    const idCus = req.user._id
    const { firstName, lastName, address, email, phonenumber,voucher } = req.body
    const session_id = req.params.session_id
    console.log({ firstName, lastName, address, email, phonenumber,voucher } )
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

        lineItems?.map(async (item) => {
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

        if(voucher?.discount >0){
          
            const voucherDB = await Voucher.findById({_id:voucher._id})
            const quantity = voucher.quantity
            voucherDB.set({
                 quantity: quantity-1
            })
            await voucherDB.save()
         }

        const order = new Order({
            stateOrder: stateOrder,
            shippingFee: shippingFee,
            paymentMethod: paymentMethod,
            totalPrice: totalPrice,
            idCustomer: idCus,
            order_details: orderDetail,
            delivery_detail: {
                name: firstName + " " + lastName,
                address_shipping: address ?? "",
                phone: phonenumber,
                email: email
            },
            vouchers:voucher ? [{
                _idVoucher:voucher._id ?? "",
                discount:voucher.discount ?? ""
            }] : []
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