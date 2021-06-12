const express = require('express');
const router = express.Router();
var TweetModel = require('../models/TweetModel');
var UserModel = require('../models/UserModel');
const authService = require('../authService');

router.get('/', authService.verifyToken, (req, res)=>{
    //console.log('global path: '+__base)
    TweetModel.find().populate('user').sort({_id: 'desc'}).lean().exec(function (err, tweets) {
        res.status(200).send(tweets);
    });
})

router.post('/', authService.verifyToken, (req, res)=>{
    
    var tweet_instance = new TweetModel({
        content: req.body.content,
        user: req.loggedInUser
    });
    //console.log('tweet_instance: ',tweet_instance);
    tweet_instance.save(function (err) {
        if (err) return handleError(err);
        res.send(req.body);
    });
})

module.exports = router;