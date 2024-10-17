const express = require('express')
const customerRouter = express.Router()
const {verifyAdmin} = require('../services/jwt')
const customerControler = require('../controller/customer.controller')

customerRouter.post('/change-password/:id',customerControler.changePassword)
customerRouter.post('/update/:id',customerControler.updateCustomer)
customerRouter.get('/list-customer',verifyAdmin,customerControler.getListCustomer)
customerRouter.get('/list-customer/:id',customerControler.getCustomerByID)
customerRouter.get('/card/:id',customerControler.getListCart)
customerRouter.get('/:id/vouchers',customerControler.getCustomerVouchers);
customerRouter.post('/card/insert/:id',customerControler.insertProductToCard)
module.exports =customerRouter