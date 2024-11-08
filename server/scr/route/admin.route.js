const express = require('express');
const { getAdmin, createAdmin, updateAdmin,updateProfileImage, upload } = require('../controller/admin.controller');
const { verifyAdmin } = require('../services/jwt');
const adminRouter = express.Router();

adminRouter.get('/get-admin', verifyAdmin, getAdmin);

adminRouter.post('/create-admin/', verifyAdmin, createAdmin);

adminRouter.put('/update-admin/:id', verifyAdmin, updateAdmin);
adminRouter.put('/update-profile-image/:id',upload.single('image'), updateProfileImage);
module.exports = adminRouter;