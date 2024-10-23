const mongoose = require('mongoose')

const voucherSchema = new mongoose.Schema({
    nameVoucher: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        require: true
    },
    expiryDate: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    code: {
        type: String,
    }
}, {timestamps: true});

const Voucher = mongoose.model('Voucher', voucherSchema)
module.exports = Voucher