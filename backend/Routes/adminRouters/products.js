const express = require("express");
const { getProducts, addProducts, updateProducts, deleteProducts } = require("../../Controllers/adminControllers/product");
const router = express.Router();

// admin product add routes
router.get('/allProduct', getProducts);
router.post('/addProduct',addProducts );
router.put('/updateProduct/:id',updateProducts);
router.delete('/deleteProduct/:id', deleteProducts);


module.exports=router;