const express= require('express')
const supplierControler = require('../controller/supplier.controller')
const {verifyAdmin} = require('../services/jwt')
const supplierRoute = express.Router()


supplierRoute.get("/list-supplier",verifyAdmin,supplierControler.getAllSuplier)
supplierRoute.get("/list-supplier/:id",verifyAdmin,supplierControler.getSuplierById)
supplierRoute.post("/create-supplier",verifyAdmin,supplierControler.createSupplier)
supplierRoute.post("/update-suppler/:id",verifyAdmin,supplierControler.updateSupplier)
supplierRoute.delete("/delete-supplier/:id",verifyAdmin,supplierControler.deleteSupplier)

module.exports= supplierRoute