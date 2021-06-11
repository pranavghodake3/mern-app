const express = require('express');
const router = express.Router();
var TweetModel = require('../models/TweetModel');
var UserModel = require('../models/UserModel');
const authService = require('../authService');

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
        //profile_url: req.body.profile_url,
        profile_url: 'https://picsum.photos/200/200',
        following: [],
        followers: []
    });

    user_instance.save(function (err) {
        if (err) return handleError(err);
        res.send(req.body);
    });
})

router.post('/byemail', (req, res)=>{
    UserModel.findOne({email: req.body.email}).lean().
    then((user) => {
        if(!user){
            res.status(401).send({'success': false, 'message': 'Invalid email'});
        }else{
            res.send({
                'success': true,
                'message': 'Valid email',
                'user': user
            })
        }
    });
})

function verifyToken(req, res, next) {
    //console.log('req.headers: ',req.headers)
    const bearerHeader = req.headers['authorization'];
  
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      //console.log('bearer: ',bearer);
      req.token = bearerToken;
      jwt.verify(bearerToken, Config.secretKey, function(err, decoded) {
        if(err){
            res.status(401).send({
                accesstoken: 'Invalid accesstoken'
            });
        }else{
            req.loggedUser = decoded;
            next();
        }
    });
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }

router.post('/followorunfollow', verifyToken, (req, res)=>{

    console.log('req.loggedUser._id: '+req.loggedUser._id);
    console.log('req.loggedUser.name: ', req.loggedUser.name);
    console.log('req.loggedUser.following: ',req.loggedUser.following);
    console.log('req.loggedUser.followers: ',req.loggedUser.followers);

    console.log('req.body.user._id: '+req.body.user._id);
    console.log('req.body.user.name: ', req.body.user.name);
    console.log('req.body.user.following: ',req.body.user.following);
    console.log('req.body.user.followers: ',req.body.user.followers);

    if(req.loggedUser.following.includes(req.body.user._id)){ // User Pressed Unfollow
        console.log('In If')
        let followingExistingUsers = req.loggedUser.following;
        let arrvalueIndex = followingExistingUsers.indexOf(req.body.user._id);
        if (arrvalueIndex > -1) {
            followingExistingUsers.splice(arrvalueIndex, 1);
        }
        let followingNewUsers =  followingExistingUsers;
        var loggedInUserUpdateData = {
            following: followingNewUsers
        };

        let followersExistingUsers = req.body.user.followers;
        arrvalueIndex = followersExistingUsers.indexOf(req.loggedUser._id);
        if (arrvalueIndex > -1) {
            followersExistingUsers.splice(arrvalueIndex, 1);
        }
        let followersNewUsers =  followersExistingUsers;
        var anotherUserUpdateData = {
            followers: followersNewUsers
        };
    }else{ // User Pressed Follow
        console.log('In elseee')
        let followingExistingUsers = req.loggedUser.following;
        followingExistingUsers =  followingExistingUsers.concat(req.body.user._id);
        let followingNewUsers =  followingExistingUsers;
        var loggedInUserUpdateData = {
            following: followingNewUsers
        };

        let followersExistingUsers = req.body.user.followers;
        followersExistingUsers =  followersExistingUsers.concat(req.loggedUser._id);
        let followersNewUsers =  followersExistingUsers;
        var anotherUserUpdateData = {
            followers: followersNewUsers
        };
    }
    let followerUserId = req.body.user._id;
    //console.log('loggedInUserUpdateData: ',loggedInUserUpdateData);
    //console.log('anotherUserUpdateData: ',anotherUserUpdateData);


    UserModel.updateMany({ _id: req.loggedUser._id }, loggedInUserUpdateData, (err, writeResult) => {
        if(err){
            console.log('Err: ',err);
            res.status(400).send({
                'success': false,
                'message': 'Error to Updating'
            })
        }else{
            UserModel.updateMany({ _id: followerUserId }, anotherUserUpdateData, (err, writeResult) => {
                if(err){
                    console.log('Err: ',err);
                    res.status(400).send({
                        'success': false,
                        'message': 'Error to Updating'
                    })
                }else{
                    //console.log('writeResult: ',writeResult);
                    res.status(200).send({
                        'success': true,
                        'message': 'Updated successfully'
                    })
                }
            });
        }
    });
})

module.exports = router;