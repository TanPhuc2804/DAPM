const express = require('express');
const staffRouter = express.Router();
const { verifyAdmin } = require('../services/jwt');
const {
    createStaff,
    getStaffById,
    getAllStaff,
    updateStaff,
    deleteStaff
} = require('../controller/staff.controller');
staffRouter.all("*", verifyAdmin)
staffRouter.post('/create-staff/', createStaff);
staffRouter.get('/get-allstaff/', getAllStaff);
staffRouter.get('/get-staff/:id', getStaffById);
staffRouter.put('/upt-staff/:id', updateStaff);
staffRouter.delete('/delete-staff/:id', deleteStaff);

module.exports = staffRouter;