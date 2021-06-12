import React, { Component, useState, useContext, useEffect } from 'react';
import SingleTwitt from './SingleTwitt/SingleTwitt';
import './TwitterList.css';
import axios from 'axios';

const TwitterList = (props) =>{
    const [tweets, setTweets] = useState([])
    const [loadTweets, setLoadTweets] = useState(true);

    useEffect(() => {
        var authData = localStorage.getItem('authData');
        console.log('loadTweets: '+loadTweets);
        console.log("Start tweets: ",tweets);
        if(authData && loadTweets && tweets.length == 0){
            authData = JSON.parse(authData);
            console.log('Add.js authData: ', authData);
            var headers = { headers: {"Authorization" : "Bearer "+authData.accesstoken} };
            axios.get('http://localhost:9002/tweets', headers)
            .then((response) => {
                //console.log("Initial tweets: ",tweets);
                setTweets((prevTweets) => {
                    return [...prevTweets, ...response.data];
                });
                setLoadTweets(false);
            })
            .catch((err) => {
                console.log(err)
            })
        }
    })

    const handleViewOtherUserProfile = (email) => {
        console.log('Called twitter list component: '+email);
        props.handleViewOtherUserProfile(email);
    }

    return (
        <div className="TwitterList">
            {
                tweets.length > 0 && tweets.map((tweet) => {
                    return <SingleTwitt singleTweet={tweet} key={tweet._id} handleViewOtherUserProfile={handleViewOtherUserProfile} />;
                })
            }
        </div>
    )
}

export default TwitterList;