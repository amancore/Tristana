const express = require("express");
const { getAllBanners, addBanners, deleteBanners } = require("../../Controllers/adminControllers/banners");
const router = express.Router();

// banners routes
router.get("/all",getAllBanners);
router.post('/addNew', addBanners);
router.delete("/deleteBanners/:id",deleteBanners);


module.exports=router;