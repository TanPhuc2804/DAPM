const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    stateOrder: {
      type: String,
      required: true,
      enum: ['waiting', 'comfirmed', 'shipping', 'delivered', 'success','cancelled'] // Possible order states
    },
    shippingFee: {
      type: Number,
      required: true,
      min: 0 // Ensure non-negative shipping fee
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0 // Ensure non-negative total price
    },
    paymentMethod: {
      type: String,
      required: true
    },
    cancelDate: {
      type: Date
    },
    idCustomer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer' // Reference to the Customer schema
    },
    delivery_detail:{
      name:{
        type:String,
      },
      address_shipping:{
        type:String
      },
      phone:{
        type:String
      },
      email:{
        type:String
      }
    },
    order_details: [{
      _idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' // Reference to the Product schema
        // Consider adding required: true for stricter validation
      },
      price: {
        type: Number,
        required: true,
        min: 0 // Ensure non-negative price
      },
      quantity: {
        type: Number,
        required: true,
        min: 1 // Ensure positive quantity
      },
      name: {
        type: String,
        required: true,
        trim: true // Remove leading/trailing whitespaces
      },
      size: {
        type: String,
        trim: true
      }
    }],
    vouchers: [{
      _idVoucher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher' // Reference to the Voucher schema
      },
      discount: {
        type: Number,
      },
      code: {
        type: String,
        // Ensure unique voucher code within the order
      }
    }]
  },{timestamps: true});
const Order = mongoose.model("Order",orderSchema)
module.exports = Order