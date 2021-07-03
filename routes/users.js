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

router.post('/followorunfollow', authService.verifyToken, (req, res)=>{
    UserModel.findOne({_id: req.loggedInUser._id}).lean().
    then((user) => {
        if(!user){
            res.status(401).send({'success': false, 'message': 'Invalid credentials'});
        }else{
            var loggedInUserInfo = user;
            // console.log('loggedInUserInfo: ',loggedInUserInfo);
            // console.log('loggedInUserInfo._id: '+loggedInUserInfo._id);
            // console.log('loggedInUserInfo.name: ', loggedInUserInfo.name);
            // console.log('loggedInUserInfo.following: ',loggedInUserInfo.following);
            // console.log('loggedInUserInfo.followers: ',loggedInUserInfo.followers);

            // console.log('req.body.user._id: '+req.body.user._id);
            // console.log('req.body.user.name: ', req.body.user.name);
            // console.log('req.body.user.following: ',req.body.user.following);
            console.log('req.body.user.followers: ',req.body.user.followers);
            var followed = false;

            if(loggedInUserInfo.following.includes(req.body.user._id)){ // User Pressed Unfollow
                console.log('In If')
                let followingExistingUsers = loggedInUserInfo.following;
                let arrvalueIndex = followingExistingUsers.indexOf(req.body.user._id);
                if (arrvalueIndex > -1) {
                    followingExistingUsers.splice(arrvalueIndex, 1);
                }
                let followingNewUsers =  followingExistingUsers;
                var loggedInUserUpdateData = {
                    following: followingNewUsers
                };

                let followersExistingUsers = req.body.user.followers;
                console.log('followersExistingUsers: ',followersExistingUsers)
                arrvalueIndex = followersExistingUsers.indexOf(loggedInUserInfo._id);
                if (arrvalueIndex > -1) {
                    followersExistingUsers.splice(arrvalueIndex, 1);
                }
                let followersNewUsers =  followersExistingUsers;
                console.log('followersNewUsers: ',followersNewUsers)
                var anotherUserUpdateData = {
                    followers: followersNewUsers
                };
            }else{ // User Pressed Follow
                followed = true;
                console.log('In elseee')
                let followingExistingUsers = loggedInUserInfo.following;
                followingExistingUsers =  followingExistingUsers.concat(req.body.user._id);
                let followingNewUsers =  followingExistingUsers;
                var loggedInUserUpdateData = {
                    following: followingNewUsers
                };

                let followersExistingUsers = req.body.user.followers;
                followersExistingUsers =  followersExistingUsers.concat(loggedInUserInfo._id);
                let followersNewUsers =  followersExistingUsers;
                var anotherUserUpdateData = {
                    followers: followersNewUsers
                };
            }
            let followerUserId = req.body.user._id;
            //console.log('loggedInUserUpdateData: ',loggedInUserUpdateData);
            //console.log('anotherUserUpdateData: ',anotherUserUpdateData);


            UserModel.updateMany({ _id: loggedInUserInfo._id }, loggedInUserUpdateData, (err, writeResult) => {
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
                            UserModel.findOne({_id: followerUserId}).lean().
                            then((user) => {
                                res.status(200).send({
                                    'success': true,
                                    'message': 'Updated successfully',
                                    'followed': followed,
                                    'user': user
                                })
                            });
                        }
                    });
                }
            });
        }
    });
})

module.exports = router;