const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controller/product.controller');

const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:id', getProductById);
productRouter.post('/', createProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;