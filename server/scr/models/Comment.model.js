const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    textComment: {
        type: String,
        required: true,
        trim: true
    },
    qualityProduct: {
        type: String,
        required: true
    },
    serviceAttitude: {
        type: String,
        required: true
    },
    numberStar: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    dateComment: {
        type: Date,
        default: Date.now
    },
    deliveryService: {
        type: String,
        required: true
    },
    _idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product schema
        required: true
    },
    _idCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', // Reference to the Customer schema
        required: true
    }
});

const Comment = mongoose.model("Comment",commentSchema)
module.exports = Comment