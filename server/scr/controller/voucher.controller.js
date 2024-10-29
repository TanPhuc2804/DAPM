
// Create a new voucher
const Voucher = require('../models/Voucher.model');
const crypto = require('crypto');

// Create a new voucher
const createVoucher = async (req, res) => {
    try {
        const { nameVoucher, discount, date_start, date_end, status, quantity, customer, id_staff } = req.body;

        if (!nameVoucher || !discount || !date_start || !date_end || !status || !quantity || !customer || !id_staff) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }

        // Generate a random voucher code
        const code = crypto.randomBytes(6).toString('hex');

        const newVoucher = new Voucher({
            nameVoucher,
            discount,
            date_start,
            date_end,
            status,
            quantity,
            code,
            customer,
            id_staff
        });

        await newVoucher.save();
        res.status(201).json({ status: true, message: 'Voucher created successfully', voucher: newVoucher });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to create voucher', error: error.message });
    }
};

// Get all vouchers
const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find({}).populate('customer id_staff');
        res.status(200).json({ status: true, vouchers });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve vouchers', error: error.message });
    }
};

// Get a single voucher by ID
const getVoucherById = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id).populate('customer id_staff');
        if (!voucher) {
            return res.status(404).json({ status: false, message: 'Voucher not found' });
        }
        res.status(200).json({ status: true, voucher });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve voucher', error: error.message });
    }
};

// Get vouchers for a specific customer
const getVoucherForCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const vouchers = await Voucher.find({ customer: customerId }).populate('customer id_staff');

        if (!vouchers || vouchers.length === 0) {
            return res.status(404).json({ status: false, message: 'No vouchers found for this customer' });
        }

        res.status(200).json({ status: true, vouchers });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve vouchers for customer', error: error.message });
    }
};

// Update a voucher by ID
const updateVoucher = async (req, res) => {
    const { nameVoucher, discount, date_start, date_end, status, quantity } = req.body;
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) {
            return res.status(404).json({ status: false, message: 'Voucher not found' });
        }

        // Update fields
        voucher.nameVoucher = nameVoucher || voucher.nameVoucher;
        voucher.discount = discount || voucher.discount;
        voucher.date_start = date_start || voucher.date_start;
        voucher.date_end = date_end || voucher.date_end;
        voucher.status = status || voucher.status;
        voucher.quantity = quantity || voucher.quantity;

        await voucher.save();
        res.status(200).json({ status: true, message: 'Voucher updated successfully', voucher });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to update voucher', error: error.message });
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
        res.status(500).json({ status: false, message: 'Failed to delete voucher', error: error.message });
    }
};

module.exports = {
    createVoucher,
    getAllVouchers,
    getVoucherById,
    getVoucherForCustomer,  // Added method
    updateVoucher,
    deleteVoucher
};