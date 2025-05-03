const express = require("express");
const { allOrders, updateOrderStatus } = require("../../Controllers/adminControllers/orders");
const router = express.Router();

// order
router.get('/allOrders',allOrders);
router.put('/upadateOrder', updateOrderStatus);


module.exports=router;