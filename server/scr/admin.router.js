const express = require('express');
const { getAdmin, createAdmin, updateAdmin } = require('../controllers/Admin.controller');
const { verifyAdmin } = require('../services/jwt');
const adminRouter = express.Router();

adminRouter.get('/:id', verifyAdmin, getAdmin);

adminRouter.post('/', verifyAdmin, createAdmin);

adminRouter.put('/:id', verifyAdmin, updateAdmin);

module.exports = adminRouter;