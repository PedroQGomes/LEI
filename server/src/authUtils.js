const jwt = require('jsonwebtoken');
require('dotenv').config();
var constants = require('./constants');
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (token) {
        //console.log(token);

        jwt.verify(token, process.env.JWTKEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            next();
        });
    } else {
        res.sendStatus(401);
    }
};


const authenticateRefreshJWT = (req, res, next) => {
    const token = req.cookies.refreshToken;

    if (token) {

        jwt.verify(token, process.env.REFRESHJWTKEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            next();
        });
    } else {
        res.status(401).send("refresh token invalid");
    }
};


const generateAccessToken = (user) => {
    const accessToken = jwt.sign({ id: user.userno, adm: user.ESA }, process.env.JWTKEY, {
        expiresIn: constants.accessToken
    });
    return accessToken;
}


const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign({ id: user.userno, adm: user.ESA }, process.env.REFRESHJWTKEY, {
        expiresIn: constants.refreshToken
    });
    return refreshToken;
}


module.exports = {
    authenticateJWT: authenticateJWT,
    authenticateRefreshJWT: authenticateRefreshJWT,
    generateAccessToken: generateAccessToken,
    generateRefreshToken: generateRefreshToken
};