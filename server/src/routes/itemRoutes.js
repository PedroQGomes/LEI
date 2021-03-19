const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemControllers');

// exemplo = localhost:5000/item/?id=PV18SN91645



router.get('/category/', itemController.getItemsOfcategory);


router.get('/name/', itemController.getItemByName);


router.get('/:id', itemController.getItemByRef);

router.get('/teste/:id', itemController.teste);



module.exports = router;