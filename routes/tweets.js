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
    
    //60b7809eafa38a6529f6d70e
    //60b780cbafa38a6529f6d70f
    let userIds = ['60b7809eafa38a6529f6d70e', '60b780cbafa38a6529f6d70f', '60b8b3e36a05402f76c5c558', '60b8b51e6a05402f76c5c559', '60b8bbcc6a05402f76c5c55a', '60b8bef56a05402f76c5c55b'];
    const random = Math.floor(Math.random() * userIds.length);
    let userId = req.user._id;
    console.log('userId: ',userId)
    //console.log(random, userIds[random]);
    UserModel.findById(userId, function (err, singleuser) {
        //console.log('singleuser: ',singleuser);
        var tweet_instance = new TweetModel({
            content: req.body.content,
            user: singleuser
        });
        //console.log('tweet_instance: ',tweet_instance);
            tweet_instance.save(function (err) {
            if (err) return handleError(err);
            res.send(req.body);
        });
    });
})

module.exports = router;