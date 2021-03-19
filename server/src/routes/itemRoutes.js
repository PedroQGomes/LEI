const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemControllers');

// exemplo = localhost:5000/item/?id=ADM07041241822,942852511
router.get('/', itemController.getItemByRef);

router.get('/teste', itemController.teste);

module.exports = router;