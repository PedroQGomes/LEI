const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemControllers');



// exemplo = localhost:5000/item/category/VESTIDOS - 1600  
router.get('/category/:cat', itemController.getItemsOfcategory);

// exemplo = localhost: 5000 / item / name / TUNICA NÉVOA
router.get('/name/:name', itemController.getItemByName);


// exemplo = localhost:5000/item/PV18SN91645
router.get('/:id', itemController.getItemByRef);


// para teste apenas
router.get('/teste/:id', itemController.teste);



module.exports = router;