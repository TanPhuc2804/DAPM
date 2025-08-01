
const Product = require('../models/Product.model');
const Order = require('../models/Order.model');
const Category = require('../models/Category.model');
const Customer = require('../models/Customer.model');
//Create a new product
const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();
        const data = await Product.findById({ _id: product._id })
            .populate('category', 'name')
            .populate('supplier', 'companyName')
        res.status(201).json({ status: true, message: "Product created successfully", product: data });
    } catch (error) {
        res.status(400).json({ status: false, message: "Failed to create product", error: error.message });
    }
};

// Get all products với pagination và tối ưu query
const getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, minPrice, maxPrice, search } = req.query;
        
        // Build query filter
        let filter = {};
        if (category) filter.category = category;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        const skip = (Number(page) - 1) * Number(limit);
        
        // Sử dụng lean() để tăng performance và chỉ select fields cần thiết
        const products = await Product.find(filter)
            .populate('category', 'name') // Chỉ lấy field name từ category
            .populate('supplier', 'companyName') // Chỉ lấy field name từ supplier  
            .select('name price description image productSizes status createdAt updatedAt')
            .lean() // Trả về plain JavaScript objects thay vì Mongoose documents
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 }); // Sort theo thời gian tạo mới nhất
            
        const total = await Product.countDocuments(filter);
        
        res.status(200).json({ 
            status: true, 
            products,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        });
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
        const dataProduct = await Product.findById(product._id).populate('supplier', 'companyName').populate('category', 'name');
        res.status(200).json({ status: true, message: "Product updated successfully", product: dataProduct });
    } catch (error) {
        res.status(400).json({ status: false, message: "Failed to update product", error: error.message });
    }
};

const checkSizeProduct = async (req, res) => {
    const { idProduct, size } = req.body
    // check in order
    const countOrder = await Order.countDocuments({
        "order_details._idProduct": idProduct,
        "order_details.size": size
    })
    if (countOrder > 0) {
        return res.status(400).json({ status: false, message: "Size đã có trong đơn hàng không được xóa"});
    }
    // check in cart customer
    const countCart = await Customer.countDocuments({
        "carts.productId": idProduct,
        "carts.size.size": size
    })
    if (countCart > 0) {
        return res.status(400).json({ status: false, message: "Size đã có trong giỏ hàng không được xóa"});
    }
    return res.status(200).json({ state: true, message: "Được phép xóa" })
}

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }

        const countOrder = await Order.countDocuments({
            "order_details._idProduct": product._id
        })

        if (countOrder > 0) {
            res.status(400).json({ status: false, message: "Sản phẩm đã có trong đơn hàng khác. Không được xóa" });
        } else {
            await product.deleteOne()
            res.status(200).json({ status: true, message: "Xóa thành công" });
        }

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
    getProductForCate,
    checkSizeProduct
};

