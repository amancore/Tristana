const express = require("express");
const router=express.Router();
const {limitedEdition,shopAll,basics,limitedStocks,productById}=require("../Controllers/pageControllers");
const{search} =  require("../Controllers/searchBar");

router.get("/all",shopAll);
router.get("/limitedEdition",limitedEdition);
router.get("/basics",basics);
router.get("/limitedStocks",limitedStocks);
router.get("/search",search);
router.get("/:id",productById);


module.exports=router;
