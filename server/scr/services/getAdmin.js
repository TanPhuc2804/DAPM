const Staff = require('../models/Staff.model');

const getAdmin = async () => {
    try {
        // Find the admin user by email (or username, or role)
        const admin = await Staff.findOne({ email: "admin@gmail.com" });

        if (!admin) {
            console.log("Admin not found");
            return null;  // No admin found
        }

        // Return admin details (you can filter out sensitive fields like password)
        return {
            username: admin.username,
            email: admin.email,
            fullname: admin.fullname,
            role: admin.role
        };
    } catch (err) {
        console.log("Error fetching admin:", err.message);
        throw new Error("Could not fetch admin");
    }
};

module.exports = getAdmin;