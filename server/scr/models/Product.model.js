const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,   
      trim: true // Remove leading/trailing whitespaces
    },
    price: {
      type: Number,
      required: true,
      min: 0 // Ensure non-negative price
    },
    
    description: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: [String],
      required: true // Assuming at least one image is required
    },
    productSizes:[{
      size: {
        type: String,
        trim: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 0 // Ensure non-negative quantity
      },
    }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to the Category schema
      required: true
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier', // Reference to the Supplier schema, if applicable
      required: true
    },
    status: {  // Thêm trạng thái sản phẩm
      type: String,
      default: 'Còn hàng'
    },
    updatedAt: {
      type: Date,
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'   
   // Reference to the Comment schema
    }]
  },{timestamps:true});
  

const Product = mongoose.model("Product",productSchema)
module.exports = Product