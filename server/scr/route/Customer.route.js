const express = require('express')
const customerRouter = express.Router()
const {verifyAdmin,verifyLogin} = require('../services/jwt')
const customerControler = require('../controller/customer.controller')

customerRouter.get('/list-customer',verifyAdmin,customerControler.getListCustomer)
customerRouter.get('/list-customer/:id',customerControler.getCustomerByID)
customerRouter.get('/cart',verifyLogin,customerControler.getListCart)


customerRouter.post('/cart/update-quantity-cart',verifyLogin,customerControler.updateQuanityCart)
customerRouter.post('/cart/insert',verifyLogin,customerControler.insertProductToCard)
customerRouter.post('/change-password/:id',customerControler.changePassword)
customerRouter.post('/update/:id',verifyLogin,customerControler.updateCustomer)
module.exports =customerRouter