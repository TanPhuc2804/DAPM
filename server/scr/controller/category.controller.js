const Category = require('../models/Category.model');

// Create a new category
//const createCategory = async (req, res) => {
  // try {
      //  const category = new Category(req.body);
      //  await category.save();
     //   res.status(201).json({ status: true, message: "Category created successfully", category });
  //  } catch (error) {
   //     res.status(400).json({ status: false, message: "Failed to create category", error: error.message });
 //   }
//};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({ status: true, categories });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to retrieve categories", error: error.message });
    }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ status: false, message: "Category not found" });
        }
        res.status(200).json({ status: true, category });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to retrieve category", error: error.message });
    }
};

// Update a category by ID
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).json({ status: false, message: "Category not found" });
        }
        res.status(200).json({ status: true, message: "Category updated successfully", category });
    } catch (error) {
        res.status(400).json({ status: false, message: "Failed to update category", error: error.message });
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ status: false, message: "Category not found" });
        }
        res.status(200).json({ status: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to delete category", error: error.message });
    }
};

module.exports = {
    //createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
