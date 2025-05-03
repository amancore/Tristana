const express = require('express');
const habitController = require('../controllers/habitcontroller');
const middleware = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/', middleware.usercheck,habitController.createHabit);
router.get('/',middleware.usercheck, habitController.getHabits);
// router.put('/',authMiddleware.usercheck,habitController.updateHabit);
router.delete('/:id',middleware.usercheck,habitController.deleteHabit);

module.exports = router;