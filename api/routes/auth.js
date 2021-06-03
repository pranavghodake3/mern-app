const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const secretKey = 'testrandomkey';
const UserModel = require('../models/UserModel');



router.post('/login', (req, res) => {
    UserModel.findOne({email: req.body.email, password: req.body.password}).lean().
    then((user) => {
        if(!user){
            res.status(401).send({'success': false, 'message': 'Invalid credentials'});
        }else{
            let expiresIn = 1000;
            let accesstoken = jwt.sign(user, secretKey, {expiresIn: expiresIn});
            res.send({
                'success': true,
                'message': 'Valid credentials',
                'user': user,
                'accesstoken': accesstoken,
                'expiresIn': expiresIn
            })
        }
    });
})

/*
jwt.verify(accesstoken, secretKey, function(err, decoded) {
        if(err){
            res.send({
                accesstoken: 'Invalid accesstoken'
            });
        }else{
            console.log('decoded: ',decoded)
            res.send({
                accesstoken: accesstoken
            });
        }
    });
*/

module.exports = router;