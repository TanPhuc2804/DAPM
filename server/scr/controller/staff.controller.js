
const Staff = require('../models/Staff.model');
const bcrypt = require('bcrypt')
//create a new staff
const createStaff = async (req, res) => {
    try {
        const { email, numberphone, username } = req.body
        const emailExisted = await Staff.findOne({ email: email })
        if (emailExisted)
            return res.status(403).json({ status: false, message: 'Email đã tồn tại' });
        const numberphoneExisted = await Staff.findOne({ numberphone: numberphone })
        if (numberphoneExisted)
            return res.status(403).json({ status: false, message: 'Số điện thoại đã tồn tại' });
        const usernameExisted = await Staff.findOne({ username: username })
        if (usernameExisted)
            return res.status(403).json({ status: false, message: 'Username đã tồn tại' });

        const password = await bcrypt.hash(req.body.password, 10)
        const staffInput = {
            ...req.body,
            password: password
        }
        const staff = new Staff(staffInput);

        await staff.save();
        res.status(201).json({ status: true, message: "Staff created succesfully!", staff });
    } catch (error) {
        res.status(400).json({ status: false, message: "Failed to create staff", error: error.message });
    }
};

// Get a staff by ID
const getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) {
            return res.status(404).json({ status: false, message: 'Staff not found' });
        }
        res.status(200).json({ status: true, staff });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get all staff
const getAllStaff = async (req, res) => {
    try {
        const staffs = await Staff.find({}).populate('role', 'name'); // Thêm 'name' để chỉ lấy trường tên của role;
        res.status(200).json({ status: true, staffs });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};
//Update a Staff by ID
const updateStaff = async (req, res) => {
    const { staffcode, fullname, cccd, birthday, gender, numberphone, email, role, address, ngaylamviec, isActive } = req.body;

    try {
        const idStaff = req.params.id
        const staff = await Staff.findById(idStaff);
        if (!staff) {
            return res.status(404).json({ status: false, message: 'Staff not found' });
        }
        const emailExisted = await Staff.findOne({
            email: email
        })

        if (emailExisted && emailExisted._id != idStaff) {
            return res.status(403).json({ status: false, message: 'Email đã tồn tại' });
        }

        // Update voucher fields
        staff.code = staffcode || staff.staffcode;
        staff.fullname = fullname || staff.fullname;
        staff.cccd = cccd || staff.cccd;
        staff.birthday = birthday || staff.birthday;
        staff.gender = gender || staff.gender;
        staff.numberphone = numberphone || staff.numberphone;
        staff.email = email || staff.email;
        staff.chucvu = role || staff.role;
        staff.address = address || staff.address;
        staff.ngaylamviec = ngaylamviec || staff.ngaylamviec;
        staff.isActive = isActive !== undefined ? isActive : staff.isActive;

        await staff.save();
        res.status(200).json({ status: true, message: 'Staff updated successfully', staff });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};
// Delete a staff by ID
const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);
        if (!staff) {
            return res.status(404).json({ status: false, message: 'Staff not found' });
        }
        res.status(200).json({ status: true, message: 'Staff deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    createStaff,
    getStaffById,
    getAllStaff,
    updateStaff,
    deleteStaff
}