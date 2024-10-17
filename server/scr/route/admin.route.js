const express = require('express');
const { getAdmin, createAdmin, updateAdmin, getListAdmin } = require('../controller/admin.controller');
const { verifyAdmin } = require('../services/jwt');
const adminRouter = express.Router();

adminRouter.get('/get-admin/:id', verifyAdmin, getAdmin);
adminRouter.get('/get-Listadmin/', verifyAdmin, getListAdmin);

adminRouter.post('/create-admin/', verifyAdmin, createAdmin);

adminRouter.put('/update-admin/:id', verifyAdmin, updateAdmin);

module.exports = adminRouter;