const express = require('express');
const router = express.Router();
var itemsService = require('../services/itemService');
var constants = require('../constants');
//const itemController = require('../controllers/itemControllers');



// exemplo = localhost:5000/item/category/VESTIDOS - 1600  
router.get('/category/:cat', (req, res, next) => {

    if (req.params.cat === undefined) {
        res.status(400).send();
    }


    var categ = req.params.cat;
    itemsService.getItemBycategory(categ).then((results) => {
        res.status(200).json({
            totalresults: results.length,
            totalpages: Math.ceil(results.length / constants.pagesize),
            content: results.slice(0, constants.pagesize)
        });
    });

});

//  exemplo = localhost:5000/item/name/TUNICA NÉVOA
router.get('/name/:name', (req, res, next) => {

    // pesquisa por artigos de um dado nome
    if (req.params.name === undefined) {
        res.status(400).send();
    }

    var name = req.params.name;
    //console.log(name);
    itemsService.getItemByName(name).then((results) => {
        res.status(200).json(results);
    });


});


// exemplo = localhost:5000/item/PV18SN91645
router.get('/:id', (req, res, next) => {

    if (req.params.id === undefined) {
        res.status(400).send();
    }

    var itemRef = req.params.id;
    //console.log(itemRef);

    itemsService.getItemByRef(itemRef).then((results) => {
        res.status(200).json(results);
    })


});



// para teste apenas
router.get('/teste/:id', (req, res, next) => {
    console.log(req.params);
    res.status(200).json({
        body: 'Hello from the server!'
    });
});



module.exports = router;