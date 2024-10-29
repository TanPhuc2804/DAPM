const mongoose = require('mongoose')

const voucherSchema = new mongoose.Schema({
    nameVoucher: {
      type: String,
      required: true,   
    },
    discount: {
        type:Number,
        required:true,
    },
    date_start:{
        type:Date,
        require:true
    },
    date_end:{
        type:Date,
        require:true
    },
    status:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    code:{
        type:String,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false
    },
    id_staff:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Staff",
        required:true
    }
  },{timestamps:true});


const Category = mongoose.model('Voucher',voucherSchema)

module.exports = Category
  