const express = require('express');
const { verifyAdmin } = require('../services/jwt');
const { 
    getListRole, 
    getRole, 
    getIdRole, 
    updateRole, 
    deleteRole 
} = require('../controller/role.controller');

const roleRouter = express.Router();

roleRouter.get('/get-ListRole/',verifyAdmin, getListRole);
roleRouter.get('/getRole-name/:name',verifyAdmin, getRole); 
roleRouter.get('/getIdRole/:id',verifyAdmin, getIdRole);
roleRouter.put('/updateRole/:id',verifyAdmin, updateRole);
roleRouter.delete('/deleteRole/:id', verifyAdmin,deleteRole);

module.exports = roleRouter;
