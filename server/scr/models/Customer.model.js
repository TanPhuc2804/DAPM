const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  numberphone: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate:
    {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v);

      },
      message: 'Invalid email address'
    }
  },
  fullname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  address: {
    type: String,

  },
  birthday: {
    type: Date,

  },
  role: {
    type: String,
    default: 'Customer'
  },
  vouchers: [{
    idVoucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher' // Assuming you have a Voucher schema defined
    }
  }],
  carts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        type: String,
      },
      size: {
        type: String,
      }
    }
  ]
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer
