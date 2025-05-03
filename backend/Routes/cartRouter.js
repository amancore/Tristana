const express=require("express")
const {addProduct,cartProducts,deleteProduct}=require("../Controllers/cartControllers");
const {protect}=require("../Middleware/authMiddleware")
const router=express.Router();

router.post("/addProduct",protect,addProduct);
router.get("/cartProducts",protect,cartProducts);
router.delete("/deleteProduct",protect,deleteProduct);

module.exports = router;