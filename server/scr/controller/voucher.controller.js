const Voucher = require('../models/Voucher.model');

// Create a new voucher
const createVoucher = async (req, res) => {
    const { code, discount, expiryDate, customer } = req.body;

    if (!code || !discount || !expiryDate || !customer) {
        return res.status(400).json({ status: false, message: 'All fields are required' });
    }

    try {
        const existingVoucher = await Voucher.findOne({ code: code });
        if (existingVoucher) {
            return res.status(400).json({ status: false, message: 'Voucher code already exists' });
        }

        const newVoucher = new Voucher({ code, discount, expiryDate, customer });
        await newVoucher.save();
        res.status(201).json({ status: true, message: 'Voucher created successfully', voucher: newVoucher });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get a voucher by ID
const getVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) {
            return res.status(404).json({ status: false, message: 'Voucher not found' });
        }
        res.status(200).json({ status: true, voucher });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get all vouchers
const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find({});
        res.status(200).json({ status: true, vouchers });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Update a voucher by ID
const updateVoucher = async (req, res) => {
    const { code, discount, expiryDate, isActive } = req.body;

    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) {
            return res.status(404).json({ status: false, message: 'Voucher not found' });
        }

        // Update voucher fields
        voucher.code = code || voucher.code;
        voucher.discount = discount || voucher.discount;
        voucher.expiryDate = expiryDate || voucher.expiryDate;
        voucher.isActive = isActive !== undefined ? isActive : voucher.isActive;

        await voucher.save();
        res.status(200).json({ status: true, message: 'Voucher updated successfully', voucher });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Delete a voucher by ID
const deleteVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findByIdAndDelete(req.params.id);
        if (!voucher) {
            return res.status(404).json({ status: false, message: 'Voucher not found' });
        }
        res.status(200).json({ status: true, message: 'Voucher deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get vouchers for a specific customer
const getVouchersForCustomer = async (req, res) => {
    try {
        const vouchers = await Voucher.find({ customer: req.params.customerId, isActive: true });
        if (!vouchers.length) {
            return res.status(404).json({ status: false, message: 'No vouchers found for this customer' });
        }
        res.status(200).json({ status: true, vouchers });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    createVoucher,
    getVoucherById,
    getAllVouchers,
    updateVoucher,
    deleteVoucher,
    getVouchersForCustomer
};