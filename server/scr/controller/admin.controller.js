const Staff = require('../models/Staff.model');

// Get Admin by ID
const getAdmin = async (req, res) => {
    try {
        const admin = await Staff.findById(req.params.id).select('-password'); // Exclude the password field
        if (!admin) {
            return res.status(404).json({ status: false, message: 'Admin not found' });
        }
        res.status(200).json({ status: true, data: admin });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};


const getListAdmin = async (req, res) => {
    try {
        const admin = await Staff.find({role : '66f8e28b66c55d58fcc3c03f'}).select('-password'); // Filter by role 'Admin' and exclude password
        if (!admin.length) {
            return res.status(404).json({ status: false, message: 'No admins found' });
        }
        res.status(200).json({ status: true, data: admin });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Create Admin
const createAdmin = async (req, res) => {
    const { fullname, username, email, password, role } = req.body;

    if (!fullname || !username || !email || !password || !role) {
        return res.status(400).json({ status: false, message: 'All fields are required' });
    }

    try {
        const existedAdmin = await Staff.findOne({ email: email });
        if (existedAdmin) {
            return res.status(400).json({ status: false, message: 'Email already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Staff({
            fullname,
            username,
            email,
            password: hashPassword,
            role
        });

        await newAdmin.save();
        res.status(201).json({ status: true, message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Update Admin by ID
const updateAdmin = async (req, res) => {
    const { fullname, username, email, password, role } = req.body;

    try {
        const admin = await Staff.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ status: false, message: 'Admin not found' });
        }

        // Update fields
        admin.fullname = fullname || admin.fullname;
        admin.username = username || admin.username;
        admin.email = email || admin.email;
        if (password) {
            admin.password = await bcrypt.hash(password, 10);
        }
        admin.role = role || admin.role;

        await admin.save();
        res.status(200).json({ status: true, message: 'Admin updated successfully', data: admin });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAdmin,
    createAdmin,
    updateAdmin,
    getListAdmin
};