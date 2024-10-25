const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    discount: {
        type: Number, // Discount percentage or amount
        required: true,
        min: 0
    },
    expiryDate: {
        type: Date,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;