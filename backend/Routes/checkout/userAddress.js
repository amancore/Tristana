const express = require("express");

const router= express.Router()
const {addUserAddress,getAllAddress,updateAddress}=require("../../Controllers/checkoutControllers/addressControllers")
const {protect} = require("../../Middleware/authMiddleware");

router.get("/allAddress",protect,getAllAddress);
router.post("/addNewAddress",protect,addUserAddress);
router.put("/updateAddress/:id",updateAddress);

module.exports= router;