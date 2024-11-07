const Order = require("../models/Order.model")
const Product = require("../models/Product.model")
const Customer = require("../models/Customer.model")
const Voucher = require("../models/Voucher.model")
const nodemailer = require("nodemailer")
const sendEmailOrderSuccess = async (customer, orderData, res) => {
    if (!customer || !orderData) {
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
const sendOrderEmail = async (req, res) => {
    const order = {
        "delivery_detail": {
            "name": "Phan Tấn Phúc",
            "address_shipping": "87A/2 Phan Văn Hân , P17 , Q. Bình Thạnh",
            "phone": "0564068652",
            "email": "b@gmail.com"
        },
        "_id": "670fb8eacb7890147cf32e18",
        "stateOrder": "paymented",
        "shippingFee": 0,
        "totalPrice": 1450000,
        "paymentMethod": "Chuyển Khoản",
        "idCustomer": {
            "_id": "66f8d7e62cc142745cee62a0",
            "username": "tanphuc",
            "password": "$2b$10$tI3cQISuitHiMfRooJgIU.rggO7sGiPg5ob438chmm/gmy.wkdzX6",
            "email": "TD@gmail.com",
            "fullname": "Phan Tấn Phúc",
            "role": "Customer",
            "vouchers": [],
            "createdAt": "2024-09-29T04:30:30.111Z",
            "updatedAt": "2024-10-29T16:10:25.124Z",
            "__v": 201,
            "carts": [
                {
                    "productId": "67074ffaaebc1a195a7879d7",
                    "name": "Áo sơ mi nam",
                    "quantity": 1,
                    "price": 200000,
                    "image": " https://cdn.builder.io/api/v1/image/assets/TEMP/77a775d97af61199603d770c60d8895d5416ae798cadf2c62af809e954a6c5b1?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101",
                    "size": {
                        "size": "37",
                        "quantity": 3,
                        "_id": "671b31721a3cc8cf27cb7a32"
                    },
                    "_id": "672108f1dd97365a33219c63"
                }
            ],
            "address": "87A/2 Phan Văn Hân , P17 , Q.8",
            "birthday": "2008-04-25T00:00:00.000Z",
            "gender": "male",
            "numberphone": "0357699782"
        },
        "order_details": [
            {
                "_idProduct": {
                    "_id": "67074fb8aebc1a195a7879d3",
                    "name": "Áo so mi",
                    "price": 150000,
                    "quantity": 15,
                    "description": "Áo thun thoáng mát",
                    "image": [
                        " https://cdn.builder.io/api/v1/image/assets/TEMP/a69afc4d8acaac091ce51ee0b5900f416148a397d4c9e6ad4c908e2be993b4ba?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101",
                        "http://res.cloudinary.com/da5mlszld/image/upload/v1730017915/kbww69f6b6s9e1ykm4hq.webp"
                    ],
                    "size": "4",
                    "category": "6708db13831ac6acf50a5ec1",
                    "supplier": "6704c0ddb575f0ba3d9653f1",
                    "comments": [],
                    "createdAt": "2024-10-10T03:53:28.007Z",
                    "updatedAt": "2024-10-30T06:56:48.732Z",
                    "__v": 0,
                    "productSizes": [
                        {
                            "size": "36",
                            "quantity": 9,
                            "_id": "671dfa590e6bcf4d5cf8670b"
                        },
                        {
                            "size": "35",
                            "quantity": 12,
                            "_id": "671dfa590e6bcf4d5cf8670c"
                        },
                        {
                            "size": "36",
                            "quantity": 7,
                            "_id": "671dfac5ce9581cd739ec214"
                        }
                    ],
                    "status": "còn hàng"
                },
                "price": 150000,
                "quantity": 4,
                "name": "Áo so mi",
                "size": "30",
                "_id": "670fb8eacb7890147cf32e19"
            },
            {
                "_idProduct": {
                    "_id": "67075176aebc1a195a7879e3",
                    "name": "Quần tây - QS242808",
                    "price": 650000,
                    "quantity": 1,
                    "description": "Quần tây dành cho nam",
                    "image": [
                        "https://cdn.builder.io/api/v1/image/assets/TEMP/2f3f3ee6cf4d03ab09a34bf90014a16f4be732a463bff24e51d875962956941d?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
                    ],
                    "size": "4",
                    "category": "66f663bb5ce46b4f6b8b58c4",
                    "supplier": "6704c0ddb575f0ba3d9653f1",
                    "comments": [],
                    "createdAt": "2024-10-10T04:00:54.739Z",
                    "updatedAt": "2024-10-30T06:00:36.773Z",
                    "__v": 0,
                    "status": "Còn hàng",
                    "productSizes": [
                        {
                            "size": "34",
                            "quantity": 4,
                            "_id": "671b31a01a3cc8cf27cb7a45"
                        },
                        {
                            "size": "35",
                            "quantity": 7,
                            "_id": "671b31a01a3cc8cf27cb7a46"
                        },
                        {
                            "size": "36",
                            "quantity": 12,
                            "_id": "671b31a01a3cc8cf27cb7a47"
                        },
                        {
                            "size": "37",
                            "quantity": 11,
                            "_id": "671b31a01a3cc8cf27cb7a48"
                        }
                    ]
                },
                "price": 650000,
                "quantity": 1,
                "name": "Quần tây - QS242808",
                "size": "30",
                "_id": "670fb8eacb7890147cf32e1a"
            },
            {
                "_idProduct": {
                    "_id": "67074ffaaebc1a195a7879d7",
                    "name": "Áo sơ mi nam",
                    "price": 200000,
                    "quantity": 12,
                    "description": "Áo thun thoáng mát",
                    "image": [
                        " https://cdn.builder.io/api/v1/image/assets/TEMP/77a775d97af61199603d770c60d8895d5416ae798cadf2c62af809e954a6c5b1?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101"
                    ],
                    "size": "4",
                    "category": "6708db13831ac6acf50a5ec1",
                    "supplier": "6704c0ddb575f0ba3d9653f1",
                    "comments": [],
                    "createdAt": "2024-10-10T03:54:34.111Z",
                    "updatedAt": "2024-10-29T16:02:17.983Z",
                    "__v": 0,
                    "status": "Còn hàng",
                    "productSizes": [
                        {
                            "size": "34",
                            "quantity": 0,
                            "_id": "671b31721a3cc8cf27cb7a2f"
                        },
                        {
                            "size": "35",
                            "quantity": 5,
                            "_id": "671b31721a3cc8cf27cb7a30"
                        },
                        {
                            "size": "36",
                            "quantity": 6,
                            "_id": "671b31721a3cc8cf27cb7a31"
                        },
                        {
                            "size": "37",
                            "quantity": 3,
                            "_id": "671b31721a3cc8cf27cb7a32"
                        }
                    ]
                },
                "price": 200000,
                "quantity": 1,
                "name": "Áo sơ mi nam",
                "size": "32",
                "_id": "670fb8eacb7890147cf32e1b"
            }
        ],
        "vouchers": [],
        "createdAt": "2024-10-16T13:00:26.493Z",
        "updatedAt": "2024-10-18T17:23:55.404Z",
        "__v": 0
    }

    const customer = {
        "_id": "66f8d7e62cc142745cee62a0",
        "username": "tanphuc",
        "password": "$2b$10$tI3cQISuitHiMfRooJgIU.rggO7sGiPg5ob438chmm/gmy.wkdzX6",
        "email": "TD@gmail.com",
        "fullname": "Phan Tấn Phúc",
        "role": "Customer",
        "vouchers": [],
        "createdAt": "2024-09-29T04:30:30.111Z",
        "updatedAt": "2024-10-29T16:10:25.124Z",
        "__v": 201,
        "carts": [
            {
                "productId": "67074ffaaebc1a195a7879d7",
                "name": "Áo sơ mi nam",
                "quantity": 1,
                "price": 200000,
                "image": " https://cdn.builder.io/api/v1/image/assets/TEMP/77a775d97af61199603d770c60d8895d5416ae798cadf2c62af809e954a6c5b1?placeholderIfAbsent=true&apiKey=78644689b17e4755b6c14634047ca101",
                "size": {
                    "size": "37",
                    "quantity": 3,
                    "_id": "671b31721a3cc8cf27cb7a32"
                },
                "_id": "672108f1dd97365a33219c63"
            }
        ],
        "address": "87A/2 Phan Văn Hân , P17 , Q.8",
        "birthday": "2008-04-25T00:00:00.000Z",
        "gender": "male",
        "numberphone": "0357699782"
    }
    await sendEmailOrderSuccess(customer, order, res)


};

const updateQuantity = async (idP, cart) => {
    try {
        await Product.updateOne(
            { _id: idP, "productSizes.size": cart.size.size },
            { $inc: { "productSizes.$.quantity": -cart.quantity } }
        )

    } catch (err) {
        console.log(err)
    }

}

const insertOrder = async (req, res) => {
    const idCus = req.user._id
    const stateOrder = 'waiting'
    const { infor, cart, voucher } = req.body
    if (!idCus) {
        return res.status(401).json({ message: "Không có quyền " })
    }
    const customer = await Customer.findById({ _id: idCus })
    if (!customer) {
        return res.status(400).json({ message: "Không tìm thấy khách hàng " })

    }
    let method = "Thanh toán bằng tiền mặt"
    totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    cart.map(async (item) => {
        await updateQuantity(item.productId, item)
    })

    if (voucher.discount > 0) {
        totalPrice = totalPrice - totalPrice * (voucher.discount / 100)
        const voucherDB = await Voucher.findById({ _id: voucher._id })
        const quantity = voucher.quantity
        voucherDB.set({
            quantity: quantity - 1
        })
        await voucherDB.save()
    }
    const orderDetail = cart.map((item) => {
        return {
            _idProduct: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            size: item.size.size
        }
    })

    try {
        const order = new Order({
            stateOrder: stateOrder,
            shippingFee: 0,
            paymentMethod: method,
            totalPrice: totalPrice,
            idCustomer: idCus,
            order_details: orderDetail,
            delivery_detail: {
                name: infor.firstName + " " + infor.lastName,
                address_shipping: infor.address ?? "",
                phone: infor.phonenumber,
                email: infor.email
            },
            vouchers: voucher.discount ? [{
                _idVoucher: voucher._id ?? "",
                discount: voucher.discount ?? ""
            }] : []
        })

        const orderSave = await (await order.save()).populate("order_details._idProduct")
        sendEmailOrderSuccess(customer, orderSave)
        customer.set({
            carts: []
        })
        await customer.save()
        return res.status(200).json({ status: true, message: "Order successfully !" })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ status: false, message: err.message })
    }
}

const getListOrder = async (req, res) => {
    try {
        const listOder = await Order.find({}).populate('idCustomer order_details._idProduct')
        return res.status(200).json({ status: true, message: "Order successfully !", order: listOder })
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
}

const getListOrderOfCus = async (req, res) => {
    const idCus = req.user._id
    try {
        const listOder = await Order.find({
            idCustomer: idCus
        }).populate('idCustomer order_details._idProduct')
        return res.status(200).json({ status: true, message: "Order successfully !", order: listOder })
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }

}

const updateState = async (req, res) => {
    const idOrder = req.params.id
    const { stateOrder } = req.body
    if (!idOrder)
        return res.status(403).json({ status: false, message: "Missing id of order" })
    if (!stateOrder)
        return res.status(403).json({ status: false, message: "Missing state of order" })
    try {
        const order = await Order.findById({
            _id: idOrder
        })

        await order.set({
            stateOrder: stateOrder
        }).save()
        return res.status(200).json({ status: true, message: "Change state successfully !", order: order })

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
}

const getOrderForState = async (req, res) => {
    const { stateOrder } = req.body
    if (!stateOrder)
        return res.status(403).json({ status: false, message: "Missing state of order" })

    try {
        const order = await Order.find({
            stateOrder: stateOrder
        }).populate("idCustomer")
        return res.status(200).json({ status: true, message: "Change state successfully !", order: order })

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
}

const getOrderForStateCus = async (req, res) => {
    const idCus = req.user._id
    const { stateOrder } = req.body
    if (!stateOrder)
        return res.status(403).json({ status: false, message: "Missing state of order" })

    try {
        const order = await Order.find({
            idCustomer: idCus,
            stateOrder: stateOrder
        })
        return res.status(200).json({ status: true, message: "Change state successfully !", order: order })

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
}
module.exports = {
    insertOrder,
    getListOrder,
    getListOrderOfCus,
    updateState,
    getOrderForState,
    getOrderForStateCus,
    sendOrderEmail
}