const express = require('express');
const router = express.Router();
var TweetModel = require('../models/TweetModel');
var UserModel = require('../models/UserModel');

router.get('/', (req, res)=>{
    TweetModel.find().populate('user').sort({_id: 'desc'}).lean().exec(function (err, tweets) {
        res.status(200).send(tweets);
    });
})

router.post('/', (req, res)=>{
    //60b7809eafa38a6529f6d70e
    //60b780cbafa38a6529f6d70f
    UserModel.findById('60b780cbafa38a6529f6d70f', function (err, singleuser) {
        console.log('singleuser: ',singleuser);
        var tweet_instance = new TweetModel({
            content: req.body.content,
            user: singleuser
        });
        console.log('tweet_instance: ',tweet_instance);
            tweet_instance.save(function (err) {
            if (err) return handleError(err);
            res.send(req.body);
        });
    });
})

module.exports = router;