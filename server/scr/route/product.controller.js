const bcrypt = require("bcrypt")
const Product = require('../models/Product.model');

// Get product list
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category supplier');
        res.status(200).json({ status: true, data: products });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category supplier');
        if (!product) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }
        res.status(200).json({ status: true, data: product });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const { name, price, quantity, description, image, size, category, supplier } = req.body;

    if (!name || !price || !quantity || !description || !image || !category || !supplier) {
        return res.status(400).json({ status: false, message: 'All fields are required' });
    }

    try {
        const newProduct = new Product({
            name,
            price,
            quantity,
            description,
            image,
            size,
            category,
            supplier
        });

        await newProduct.save();
        res.status(201).json({ status: true, message: 'Product created successfully', data: newProduct });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const { name, price, quantity, description, image, size, category, supplier } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }

        // Update fields
        product.name = name || product.name;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.description = description || product.description;
        product.image = image || product.image;
        product.size = size || product.size;
        product.category = category || product.category;
        product.supplier = supplier || product.supplier;

        await product.save();
        res.status(200).json({ status: true, message: 'Product updated successfully', data: product });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: false, message: 'Product not found' });
        }

        await product.remove();
        res.status(200).json({ status: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};