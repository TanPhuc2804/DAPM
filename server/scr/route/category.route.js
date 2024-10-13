const express = require('express');
const {verifyAdmin} = require('../services/jwt')
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controller/category.controller');

const categoryRouter = express.Router();

categoryRouter.post('/create-category', verifyAdmin,createCategory);

categoryRouter.get('/get-categorylist', getAllCategories);

categoryRouter.get('/get-category/:id', getCategoryById);

categoryRouter.put('/update-category/:id',verifyAdmin, updateCategory);

categoryRouter.delete('/delete-category/:id',verifyAdmin, deleteCategory);

module.exports = categoryRouter;