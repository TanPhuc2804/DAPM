
const Product = require('../models/Product.model');
const Category = require('../models/Category.model')
// Create a new product
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ status: true, message: "Product created successfully", product });
    } catch (error) {
        res.status(400).json({ status: false, message: "Failed to create product", error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ status: true, products });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to retrieve products", error: error.message });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById({
            _id: req.params.id
        })
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }
        res.status(200).json({ status: true, product });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to retrieve product", error: error.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    const id = req.params.id
    const product = req.body

    if (!id)
        return res.status(403).json({ status: false, message: "Id disappear !" })
    if (!product)
        return res.status(403).json({ status: false, message: "Input required !" })

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }
        res.status(200).json({ status: true, message: "Product updated successfully", product });
    } catch (error) {
        res.status(400).json({ status: false, message: "Failed to update product", error: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }
        res.status(200).json({ status: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to delete product", error: error.message });
    }
};

const getProductForCate = async (req, res) => {
    const idCate = req.params.id
    console.log(idCate)
    if (!idCate || idCate === "id")
        return res.status(403).json({ status: false, message: "Missing id category" })
    try {
        const listPro = await Product.find({
            category: idCate
        })
        return res.status(200).json({ status: true, message: "Get product for category success", product: listPro })
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })

    }

}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductForCate
};

