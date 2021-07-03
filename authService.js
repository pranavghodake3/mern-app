var jwt = require('jsonwebtoken');
const Config = require('./config');

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, Config.secretKey, function(err, decoded) {
        if(err){
            res.status(401).send({
                success: false,
                message: 'Invalid credentials',
                data: {}
            });
        }else{
            req.loggedInUser = decoded;
            next();
        }
    });
    } else {
        res.status(401).send({
            success: false,
            message: 'Invalid credentials',
            data: {}
        });
    }
}

exports.createToken = (encodedData) => {
    return {
        expiresIn: Config.expiresIn,
        accesstoken: jwt.sign(encodedData, Config.secretKey, {expiresIn: Config.expiresIn})
    }
}