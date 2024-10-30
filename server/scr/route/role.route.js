const express = require('express');
const {verifyAdmin} = require('../services/jwt')
const {getAllRole} = require('../controller/role.controller');
const categoryRouter = require('./category.route');

const RoleRouter = express.Router();

RoleRouter.get('/get-allrole', verifyAdmin,getAllRole);

module.exports = RoleRouter;