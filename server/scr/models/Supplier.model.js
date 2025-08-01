    const mongoose = require('mongoose')
    const supplierSchema = new mongoose.Schema({
        companyName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate:
            {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(v);

                },
                message: 'Invalid email address'
            }
        },
        numberphone: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    });

    const Supplier = mongoose.model("Supplier", supplierSchema)
    module.exports = Supplier