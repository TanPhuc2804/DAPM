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

roleRouter.get('/',verifyAdmin, getListRole);
roleRouter.get('/getRole-name/:name',verifyAdmin, getRole); 
roleRouter.get('/:id',verifyAdmin, getIdRole);
roleRouter.put('/:id',verifyAdmin, updateRole);
roleRouter.delete('/:id', verifyAdmin,deleteRole);

module.exports = roleRouter;
