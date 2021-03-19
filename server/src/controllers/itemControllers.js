var dboperations = require('../data/dbOperations');

const getItemByRef = (req, res, next) => {

    if (req.query.id === undefined) {
        res.status(400).send();
    }


    var itemRef = req.query.id;
    console.log(itemRef);

    dboperations.getItemByRef(itemRef).then((results) => {
        res.status(200).json({
            body: results
        });
    })

};


const teste = (req, res, next) => {
    res.status(200).json({
        body: 'Hello from the server!'
    });
};




module.exports = {
    getItemByRef: getItemByRef,
    teste: teste
}