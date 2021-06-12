import React, { Component } from 'react';
import { useParams, Link, withRouter } from 'react-router-dom';
import './SingleTwitt.css';

const SingleTwitt = (props) => {
    const timeAgoCalculate = (date) => {
        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }
    const handleViewOtherUserProfile = () => {
        props.history.push(`/${props.singleTweet.user.email}`);
        //props.handleViewOtherUserProfile(props.singleTweet.user.email);
    }

    var userProfilePicture = props.singleTweet.user.profile_url;
    if(userProfilePicture == ''){
        userProfilePicture = 'https://picsum.photos/200/200';
    }
    return (
        <div className="row single-twit">
            <div className="col-sm user-profile">
                <img src={userProfilePicture} alt='User Profile' />
            </div>
            <div className="col-sm">
                <Link to={`/${props.singleTweet.user.email}`}>=={props.singleTweet.user.name}==</Link>
                <div className='view-user-profile hover' onClick={handleViewOtherUserProfile}><strong>{props.singleTweet.user.name}</strong> <span className='user-email'>@{props.singleTweet.user.name.replaceAll(' ', '').toLowerCase()}</span> <span className='twit-time-ago'>{timeAgoCalculate(new Date(props.singleTweet.date))}</span></div>
                <div>{props.singleTweet.content}</div>
            </div>
        </div>
    );
}

export default withRouter(SingleTwitt);