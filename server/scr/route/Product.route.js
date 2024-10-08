const express = require('express');
const { getAllProducts, getProductById,createProduct,updateProduct,deleteProduct } = require('../controller/product.controller');
const {verifyAdmin} = require('../services/jwt')
const router = express.Router();

// Public routes
router.get('/list-product', getAllProducts);
router.get('/list-product/:id', getProductById);
router.post('/create-product',verifyAdmin, createProduct);
router.post('/update-product/:id',verifyAdmin, updateProduct);
router.delete('/delete-product/:id',verifyAdmin, deleteProduct);

module.exports = router;