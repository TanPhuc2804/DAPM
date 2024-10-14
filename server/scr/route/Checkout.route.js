const exp = require("constants")
const express = require("express")
const {verifyLogin} = require("../services/jwt")
const checkoutRouter = express.Router()

const checkoutContoller = require("../controller/checkout.controller")
checkoutRouter.all("*",verifyLogin)
checkoutRouter.post("/",checkoutContoller.checkoutProcess)
checkoutRouter.get("/complete/:session_id",checkoutContoller.completeCheckout)

module.exports = checkoutRouter