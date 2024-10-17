const Supplier = require("../models/Supplier.model")
const Product = require("../models/Product.model")
const createSupplier = async (req, res) => {
    const supplier = req.body
    if (!supplier) {
        return res.statsu(403).json({ status: false, messasge: "Input required !" })
    }
    try {
        const supplierExsisted = await Supplier.findOne({
            email: supplier.email
        })

        if (supplierExsisted)
            return res.status(401).json({ status: false, message: "Email exsisted !" })
        const newSupplier = new Supplier({
            companyName: supplier.companyName,
            email: supplier.email,
            numberphone: supplier.numberphone,
            address: supplier.address,
            description: supplier.description
        })

        await newSupplier.save()
        return res.status(200).json({ status: true, message: "Create supplier successful !" })
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
}

const getAllSuplier = async (req, res) => {
    try {
        const suppliers = await Supplier.find({})
        return res.status(200).json({ status: true, message: "Get All Suppliers Successful !", suppliers: suppliers })
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
}
const getSuplierById = async (req, res) => {
    const idSupplier = req.params.id
    try {
        const supplier = await Supplier.findById({
            _id: idSupplier
        })
        return res.status(200).json({ status: true, message: "Get All Suppliers Successful !", supplier: supplier })
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }

}
const deleteSupplier = async (req, res) => {
    const id = req.params.id

    if(!id)
        return res.status(403).json({status:false,message:"Id dissapear "})
    // check exsisted in product
    const checkExisted = await Product.countDocuments({
        supplier:id
    })

    if(checkExisted >0 ){
        return res.status(409).json({ message: 'Cannot delete supplier, it is used by products' });
    }
    await Supplier.findByIdAndDelete({
        _id:id
    })
    return res.status(200).json({status:true,message:"Delete successful"})
}
const updateSupplier = async (req, res) => {
    const id = req.params.id
    const newSupplier = req.body
    if(!id )
        return res.status(403).json({status:false,message:"ID disappear !"})
    if(!newSupplier )
        return res.status(403).json({status:false,message:"Input required !"})
    await Supplier.findByIdAndUpdate({
        _id:id
    },newSupplier)

    return res.status(200).json({status:true,message:"Update supplier successfull ! !"})

}
module.exports = {
    createSupplier,
    getAllSuplier,
    getSuplierById,
    deleteSupplier,
    updateSupplier
}