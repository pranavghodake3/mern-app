const express = require('express');
const router = express.Router();
var TweetModel = require('../models/TweetModel');
var UserModel = require('../models/UserModel');

router.get('/', (req, res)=>{
    UserModel.find().lean().exec(function (err, users) {
        res.status(200).send(users);
    });
})
  
router.post('/', (req, res)=>{
    var user_instance = new UserModel({ 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profile_url: req.body.profile_url,
        following: [],
        followers: []
    });

    user_instance.save(function (err) {
        if (err) return handleError(err);
        res.send(req.body);
    });
})

module.exports = router;