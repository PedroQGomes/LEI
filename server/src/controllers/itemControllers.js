var dboperations = require('../data/dbOperations');
var constants = require('../constants');

const getItemByRef = (req, res, next) => {

    if (req.params.id === undefined) {
        res.status(400).send();
    }

    var itemRef = req.params.id;
    //console.log(itemRef);

    dboperations.getItemByRef(itemRef).then((results) => {
        res.status(200).json(results);
    })


};

const getItemByName = (req, res, next) => {

    // pesquisa por artigos de um dado nome
    if (req.params.name === undefined) {
        res.status(400).send();
    }

    var name = req.params.name;
    //console.log(name);
    dboperations.getItemByName(name).then((results) => {
        res.status(200).json(results);
    });


}


const getItemsOfcategory = (req, res, next) => {

    if (req.params.cat === undefined) {
        res.status(400).send();
    }


    var categ = req.params.cat;
    dboperations.getItemBycategory(categ).then((results) => {
        res.status(200).json({
            totalresults: results.length,
            totalpages: Math.ceil(results.length / constants.pagesize),
            content: results.slice(0, constants.pagesize)
        });
    });



}




const teste = (req, res, next) => {
    console.log(req.params);
    res.status(200).json({
        body: 'Hello from the server!'
    });
};




module.exports = {
    getItemByRef: getItemByRef,
    getItemByName: getItemByName,
    getItemsOfcategory: getItemsOfcategory,
    teste: teste
}