const express = require('express');
const { getAdmin, createAdmin, updateAdmin } = require('../controller/admin.controller');
const { verifyAdmin } = require('../services/jwt');
const adminRouter = express.Router();

adminRouter.get('/:id', verifyAdmin, getAdmin);

adminRouter.post('/', verifyAdmin, createAdmin);

adminRouter.put('/:id', verifyAdmin, updateAdmin);

module.exports = adminRouter;