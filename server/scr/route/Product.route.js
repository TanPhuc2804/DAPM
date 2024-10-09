const express = require('express');
const { getAllProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

productRouter.get('/', getProducts);

// Route to get a specific product by ID
productRouter.get('/:id', getProductById);

// Route to create a new product (admin only)
productRouter.post('/', verifyAdmin, createProduct);

// Route to update an existing product by ID (admin only)
productRouter.put('/:id', verifyAdmin, updateProduct);

// Route to delete a product by ID (admin only)
productRouter.delete('/:id', verifyAdmin, deleteProduct);
module.exports = router;