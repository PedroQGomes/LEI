var dboperations = require('../data/dbOperations');

const saySomething = (req, res, next) => {
    res.status(200).json({
        body: 'Hello from the server!'
    });
};


const teste = (req, res, next) => {
    var itemRef = "ADM07041241822,942852511";
    var itemRef2 = req.params.id;
    console.log(itemRef2);

    dboperations.getItemByRef(itemRef).then((results) => {
        res.status(200).json({
            body: results
        });
    })

};

module.exports = {
    saySomething: saySomething,
    teste: teste
}