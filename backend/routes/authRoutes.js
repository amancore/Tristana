const express = require('express');
const authController = require('../controllers/authcontroller');
const middleware=require("../middleware/authMiddleware");
const router = express.Router();

router.post('/register', authController.register);
router.post('/login',middleware.usercheck,authController.login);

module.exports = router;