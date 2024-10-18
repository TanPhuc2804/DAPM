const Staff = require('../models/Staff.model');

// Get Admin by ID or All Admins if no ID is provided
const getAdmin = async (adminId = null) => {
    try {
        if (adminId) {
            // Find specific admin by ID
            const admin = await Staff.findById(adminId);
            return admin;
        } else {
            // If no ID, return all admins
            const admins = await Staff.find({ role: 'admin' }); // Adjust the role or query if necessary
            return admins;
        }
    } catch (error) {
        throw new Error('Error fetching admin(s)');
    }
};

module.exports = getAdmin;