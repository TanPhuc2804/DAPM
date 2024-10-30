const { message } = require('antd');
const Voucher = require('../models/Voucher.model');

// Create a new voucher
const createVoucher = async (req, res) => {
    try{
        const voucher = new Voucher(req.body);
        await voucher.save();
        res.status(201).json({status:true, message:"Voucher created succesfully!",voucher});
    }catch(error){
        res.status(400).json({status:false, message:"Failed to create voucher",error: error.message});
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
    const { nameVoucher,quantity,createdAt, discount, expiryDate, isActive } = req.body;

    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) {
            return res.status(404).json({ status: false, message: 'Voucher not found' });
        }

        // Update voucher fields
        voucher.nameVoucher = nameVoucher || voucher.nameVoucher;
        voucher.discount = discount || voucher.discount;
        voucher.expiryDate = expiryDate || voucher.expiryDate;
        voucher.quantity = quantity || voucher.quantity;
        voucher.createdAt = createdAt || voucher.createdAt;
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