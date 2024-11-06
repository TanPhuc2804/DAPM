const Staff = require('../models/Staff.model');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const Role = require('../models/Role.model'); 

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/profile_pictures');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });
  
  // Update Admin Profile Image
  const updateProfileImage = async (req, res) => {
    try {
      const adminId = req.params.id;
      const admin = await Staff.findById(adminId);
  
      if (!admin) {
        return res.status(404).json({ status: false, message: 'Admin not found' });
      }
  
      // Save new image path
      admin.image = req.file.path;
      await admin.save();
  
      res.status(200).json({ status: true, message: 'Profile image updated', data: admin });
    } catch (error) {
      res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
  };
  

// Get Admin by ID
const getAdmin = async (req, res) => {
    const id = req.user._id;
    try {
        const admin = await Staff.findById(id).select('-password'); // Exclude the password field
        if (!admin) {
            return res.status(404).json({ status: false, message: 'Admin not found' });
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
    const { fullname, username, email, password, role, numberphone, address, gender, cccd, ngaylamviec, birthday, image  } = req.body;
    const id = req.user._id;
    console.log({ fullname, username, email, password, role, numberphone, address, gender, cccd, ngaylamviec, birthday, image  })
    // Validate phone number (e.g., 10 digits)
    if (numberphone && !/^\d{10}$/.test(numberphone)) {
        return res.status(400).json({ status: false, message: 'Phone number must be 10 digits' });
    }

    // Validate CCCD (only numeric)
    if (cccd && !/^\d+$/.test(cccd)) {
        return res.status(400).json({ status: false, message: 'CCCD must contain only numbers' });
    }

    try {
        const admin = await Staff.findById(id);
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
        admin.birthday = birthday || admin.birthday;
        admin.role = role || admin.role;
        admin.numberphone = numberphone || admin.numberphone;
        admin.address = address || admin.address;
        admin.gender = gender || admin.gender;
        admin.cccd = cccd || admin.cccd;
        admin.ngaylamviec = ngaylamviec || admin.ngaylamviec;
        admin.image = image 
        

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
    updateProfileImage, 
    upload
};