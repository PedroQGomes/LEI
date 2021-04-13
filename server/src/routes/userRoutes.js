const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const sessionService = require('../services/sessionService');
var authUtils = require('../authUtils');
var constants = require('../constants');
require('dotenv').config();


router.post('/authenticate/', (req, res, next) => {
    let username = req.body.username;
    let passw = req.body.password;


    if (username === undefined || passw === undefined) {
        res.status(400).send();
    }


    userService.loginUser(username, passw).then((results) => {
        user = results;
        if (user) {

            const accessToken = authUtils.generateAccessToken(user);

            const refreshToken = authUtils.generateRefreshToken(user);

            sessionService.saveJwtToken(refreshToken, user.userno, req.ip).then(() => {
                res.cookie('accessToken', accessToken, { maxAge: constants.accessCookie, httpOnly: true });

                res.cookie('refreshToken', refreshToken, { maxAge: constants.refreshCookie, httpOnly: true });

                res.status(200).json(user);

            }).catch((err) => {
                res.status(404).send();
            });


        } else {
            res.status(404).send();
        }
    }).catch((err) => {
        res.status(404).send();
    });
});



router.post('/refresh-token/', authUtils.authenticateRefreshJWT, (req, res, next) => {
    const token = req.cookies.refreshToken;
    let payload = jwt.decode(token);

    sessionService.verifyJwt(token, payload.id).then((results) => {
        if (results) {
            if (results.revoked == 1) {
                res.status(401).send();
            }
            const accessToken = authUtils.generateAccessToken(user);
            res.cookie('accessToken', accessToken, { maxAge: constants.accessCookie, httpOnly: true });

            res.status(200).send();
        } else {
            res.status(401).send();
        }

    })



});


router.post('/revoke-token', authUtils.authenticateJWT, (req, res, next) => {
    const token = req.cookies.refreshToken;
    let payload = jwt.decode(token);

    const accessToken = req.cookies.accessToken;

    sessionService.revokeJWT(token, payload.id).then(() => {
        res.cookie('accessToken', accessToken, { maxAge: 0, httpOnly: true });
        res.cookie('refreshToken', accessToken, { maxAge: 0, httpOnly: true });
        res.status(200).send();

    }).catch((err) => {
        res.status(404).send();
    });

});




router.get('/info/', authUtils.authenticateJWT, (req, res, next) => {
    const token = req.cookies.accessToken;
    let decoded = jwt.decode(token);
    userService.getUser(decoded.id).then((results) => {

        if (results) {
            res.status(200).json(results);
        } else {
            res.status(404).send();
        }


    }).catch((err) => {
        res.status(404).send();
    });
});


module.exports = router;
module.exports = router;