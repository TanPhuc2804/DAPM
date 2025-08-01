const express = require('express');
const voucherRouter = express.Router();
const { verifyAdmin } = require('../services/jwt');
const {createVoucher,
    getVoucherById,
    getAllVouchers,
    updateVoucher,
    deleteVoucher,
    getVouchersForCustomer 
} = require('../controller/voucher.controller');


voucherRouter.post('/create-voucher/',verifyAdmin, createVoucher);        
voucherRouter.get('/get-allvoucher/',getAllVouchers);       
voucherRouter.get('/get-voucher/:id', getVoucherById);    
voucherRouter.put('/upt-voucher/:id', verifyAdmin,updateVoucher);      
voucherRouter.delete('/delete-voucher/:id', verifyAdmin,deleteVoucher);   

voucherRouter.get('/get-vouchcustomer/active', getVouchersForCustomer );

module.exports = voucherRouter;