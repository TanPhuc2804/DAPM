const Role = require('../models/Role.model');

// Get a list of all roles
const getListRole = async (req, res) => {
    try {
        const roles = await Role.find({});
        res.status(200).json({ status: true, roles });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve roles', error: error.message });
    }
};

// Get a role by its name (if needed)
const getRole = async (req, res) => {
    const { name } = req.params;
    try {
        const role = await Role.findOne({ name });
        if (!role) {
            return res.status(404).json({ status: false, message: 'Role not found' });
        }
        res.status(200).json({ status: true, role });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve role', error: error.message });
    }
};

// Get a role by its ID
const getIdRole = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ status: false, message: 'Role not found' });
        }
        res.status(200).json({ status: true, role });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to retrieve role', error: error.message });
    }
};

// Update a role by ID
const updateRole = async (req, res) => {
    const { name } = req.body;
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ status: false, message: 'Role not found' });
        }

        role.name = name || role.name;
        await role.save();
        res.status(200).json({ status: true, message: 'Role updated successfully', role });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to update role', error: error.message });
    }
};

// Delete a role by ID
const deleteRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            return res.status(404).json({ status: false, message: 'Role not found' });
        }
        res.status(200).json({ status: true, message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to delete role', error: error.message });
    }
};

module.exports = {
    getListRole,
    getRole,
    getIdRole,
    updateRole,
    deleteRole
};
