const express = require('express');
const router = express.Router();
var TweetModel = require('../models/TweetModel');
var UserModel = require('../models/UserModel');
var jwt = require('jsonwebtoken');
const secretKey = 'testrandomkey';

router.get('/', (req, res)=>{
    TweetModel.find().populate('user').sort({_id: 'desc'}).lean().exec(function (err, tweets) {
        res.status(200).send(tweets);
    });
})

function verifyToken(req, res, next) {
    console.log('req.headers: ',req.headers)
    const bearerHeader = req.headers['authorization'];
  
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      console.log('bearer: ',bearer);
      req.token = bearerToken;
      jwt.verify(bearerToken, secretKey, function(err, decoded) {
        if(err){
            res.status(401).send({
                accesstoken: 'Invalid accesstoken'
            });
        }else{
            req.user = decoded;
            next();
        }
    });
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }

router.post('/', verifyToken, (req, res)=>{
    
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