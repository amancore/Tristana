const express = require("express");
const router = express.Router();
const { addCoupon, getAllCoupons, deleteCoupon, updateCoupon, couponByValue } = require("../../Controllers/adminControllers/Coupon");

// coupon routes
router.post('/addCoupon', addCoupon);
router.get('/getCoupon', getAllCoupons);
router.delete('/deleteCoupon/:id', deleteCoupon);
router.put('/updateCoupon/:id', updateCoupon);
router.post('/couponByValue', couponByValue);

module.exports = router;