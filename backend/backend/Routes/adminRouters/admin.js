const express = require("express");
const router = express.Router();
const {protect}=require("../../Middleware/authMiddleware");
const {protectAdmin}=require("../../Middleware/ProtectAdmin");

const bannersRoutes= require("./banners")
const couponsRoutes= require("./coupons")
const ordersRoutes= require("./orders")
const productsRoutes= require("./products")
const statsRoutes= require("./stats")


router.use("/banners",protect,protectAdmin,bannersRoutes);
router.use("/coupons",protect,protectAdmin,couponsRoutes);
router.use("/orders",protect,protectAdmin,ordersRoutes);
router.use("/products",protect, protectAdmin,productsRoutes);
router.use("/stats",protect, protectAdmin,statsRoutes);



module.exports = router;