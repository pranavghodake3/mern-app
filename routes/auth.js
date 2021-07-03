const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserModel');
const authService = require('../authService');

router.post('/login', (req, res) => {
    UserModel.findOne({email: req.body.email, password: req.body.password}).lean().
    then((user) => {
        if(!user){
            res.status(401).send({'success': false, 'message': 'Invalid credentials'});
        }else{
            var encodedData = {
                _id: user._id
            }
            res.send({
                success: true,
                message: 'Valid credentials',
                data: authService.createToken(encodedData)
            })
        }
    });
})

router.get('/profile', authService.verifyToken, (req, res)=>{
    UserModel.findOne({_id: req.loggedInUser._id}).lean().
    then((user) => {
        if(!user){
            res.status(401).send({'success': false, 'message': 'Invalid credentials'});
        }else{
            res.send(user);
        }
    });
})

module.exports = router;