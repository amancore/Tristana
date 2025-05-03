const express = require("express");
const { allUsers, stats } = require("../../Controllers/adminControllers/stats");
const router = express.Router();



router.get('/users', allUsers);
router.get('/stats', stats);



module.exports=router;