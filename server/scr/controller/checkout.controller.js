require("dotenv").config()
const nodemailer = require("nodemailer")
const stripe = require("stripe")(process.env.SECRET_KEY_CHECKOUT)
const { info } = require("console")
const Order = require("../models/Order.model")
const Product = require("../models/Product.model")
const Customer = require("../models/Customer.model")
const Voucher = require("../models/Voucher.model")

const sendEmailOrderSuccess = async (customer, orderData,res) => {
    if (!customer|| !orderData) {
        console.log("Bị mất dữ liệu !")
        return
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'phantanphuc282004@gmail.com',
            pass: 'hsgtposfpndltoec',
        },
    })

    const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
      <h2 style="text-align: center; color: #4caf50;">Xác nhận đơn hàng của bạn</h2>
  
      <p>Xin chào ${customer.fullname},</p>
      <p>Cảm ơn bạn đã đặt hàng! Dưới đây là thông tin đơn hàng của bạn:</p>
      
      <h3>Chi tiết đơn hàng</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Sản phẩm</th>
            <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Số lượng</th>
            <th style="border-bottom: 1px solid #ddd; padding: 8px; text-align: left;">Giá</th>
          </tr>
        </thead>
        <tbody>
          ${orderData.order_details.map(item => `
            <tr>
              <td style="border-bottom: 1px solid #ddd; padding: 8px;">
                <img src="${item._idProduct.image[0]}" alt="${item.name}" style="width: 80px; height: 80px; margin-right: 10px; vertical-align: middle;">
                ${item.name} (Size: ${item.size})
              </td>
              <td style="border-bottom: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
              <td style="border-bottom: 1px solid #ddd; padding: 8px;">${item.price.toLocaleString()} VNĐ</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <p><strong>Giảm giá:</strong> ${orderData.vouchers[0]?.discount.toLocaleString() ?? 0} %</p>     
      <p><strong>Phí vận chuyển:</strong> ${orderData.shippingFee.toLocaleString()} VNĐ</p>
      <p><strong>Tổng cộng:</strong> ${orderData.totalPrice.toLocaleString()} VNĐ</p>
      <p><strong>Phương thức thanh toán:</strong> ${orderData.paymentMethod}</p>
      <hr />
  
      <h3>Thông tin giao hàng</h3>
      <p><strong>Tên người nhận:</strong> ${orderData.delivery_detail.name}</p>
      <p><strong>Địa chỉ:</strong> ${orderData.delivery_detail.address_shipping}</p>
      <p><strong>Số điện thoại:</strong> ${orderData.delivery_detail.phone}</p>
      <p><strong>Email:</strong> ${orderData.delivery_detail.email}</p>
      
      <p style="text-align: center; font-size: 12px; color: #888;">Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi!</p>
    </div>
  `;

    const mailOptions = {
        from: "phantanphuc282004@gmail.com",
        to: customer.email,
        subject: "Chi tiết đơn hàng",
        html: emailHtml
    }

    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.status(500).json({ error: 'Không thể gửi email' });
            }
          });
    } catch (err) {
        console.log(err)
    }
}

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

        const customer = await Customer.findById({_id:idCus})
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
        
        const orderSave =await (await order.save()).populate("order_details._idProduct")
        sendEmailOrderSuccess(customer,orderSave)
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