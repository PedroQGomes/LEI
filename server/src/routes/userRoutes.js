const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
var constants = require('../constants');



router.post('/login/', (req, res, next) => {
    let username = req.body.username;
    let passw = req.body.password;


    if (username === undefined || passw === undefined) {
        res.status(400).send();
    }


    userService.getUser(username, passw).then((results) => {
        user = results[0];
        if (user) {
            console.log(user);
            console.log(user.username);
            console.log(user.ESA);
            const accessToken = jwt.sign({ username: user.userno, role: user.ESA }, constants.jwtkey);

            res.status(200).json({
                token: accessToken
            })


        } else {
            res.status(404).send();
        }

    });


});


module.exports = router;