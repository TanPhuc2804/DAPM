const express = require('express');
const {
    //createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controller/category.controller');

const categoryRouter = express.Router();

//categoryRouter.post('/', createCategory);

categoryRouter.get('/get-categorylist', getAllCategories);

categoryRouter.get('/get-category/:id', getCategoryById);

categoryRouter.put('/update-category/:id', updateCategory);

categoryRouter.delete('/delete-category/:id', deleteCategory);

module.exports = categoryRouter;