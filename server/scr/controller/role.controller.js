const Role = require('../models/Role.model');

const getAllRole = async (req, res) => {
    try {
        const role = await Role.find({});
        res.status(200).json({ status: true, role });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to retrieve role", error: error.message });
    }
};

module.exports = {
  getAllRole
};