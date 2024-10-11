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

categoryRouter.get('/', getAllCategories);

categoryRouter.get('/:id', getCategoryById);

categoryRouter.put('/:id', updateCategory);

categoryRouter.delete('/:id', deleteCategory);

module.exports = categoryRouter;
