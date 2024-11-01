const Order = require("../models/Order.model")
const express = require("express")
const orderRouter = express.Router()
const {verifyLogin,verifyAdmin} = require("../services/jwt")
const OrderController = require("../controller/order.controller")

orderRouter.all("*",verifyLogin)
orderRouter.get("/all-order",verifyAdmin,OrderController.getListOrder)
orderRouter.get("/list-order",OrderController.getListOrderOfCus)
orderRouter.post("/list-order-for-state",OrderController.getOrderForState)
orderRouter.post("/insert-order",OrderController.insertOrder)
orderRouter.post("/change-state/:id",verifyAdmin,OrderController.updateState)
orderRouter.post("/test",verifyAdmin,OrderController.sendOrderEmail)

module.exports = orderRouter