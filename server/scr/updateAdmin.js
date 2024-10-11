const bcrypt = require('bcrypt');
const Staff = require('../models/Staff.model');

const updateAdmin = async (adminId, updateData) => {
    try {
        // Find the admin by ID
        const admin = await Staff.findById(adminId);
        if (!admin) {
            return null; // Admin not found
        }

        // Update fields if they are provided in the updateData
        if (updateData.username) admin.username = updateData.username;
        if (updateData.email) admin.email = updateData.email;
        if (updateData.numberphone) admin.numberphone = updateData.numberphone;
        if (updateData.address) admin.address = updateData.address;
        if (updateData.fullname) admin.fullname = updateData.fullname;
        if (updateData.gender) admin.gender = updateData.gender;
        if (updateData.birthday) admin.birthday = updateData.birthday;

        // If the password is provided, hash it before saving
        if (updateData.password) {
            const hashedPassword = await bcrypt.hash(updateData.password, 10);
            admin.password = hashedPassword;
        }

        // Save the updated admin
        const updatedAdmin = await admin.save();
        return updatedAdmin;
    } catch (error) {
        throw new Error('Error updating admin');
    }
};

module.exports = updateAdmin;