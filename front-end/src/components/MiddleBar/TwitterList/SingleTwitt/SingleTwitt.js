import React, { Component } from 'react';
import './SingleTwitt.css';

class SingleTwitt extends Component {
    constructor(props) {
        super(props);
    }
    
    timeAgoCalculate = (date) => {
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
    handleViewOtherUserProfile = () => {
        this.props.handleViewOtherUserProfile(this.props.singleTweet.user.email);
    }

    render() {
        var userProfilePicture = this.props.singleTweet.user.profile_url;
        if(userProfilePicture == ''){
            userProfilePicture = 'https://picsum.photos/200/300';
        }
        return (
            <div className="row single-twit">
                <div className="col-sm user-profile">
                    <img src={userProfilePicture} alt='User Profile' />
                </div>
                <div className="col-sm">
                    <div className='view-user-profile hover' onClick={this.handleViewOtherUserProfile}><strong>{this.props.singleTweet.user.name}</strong> <span className='user-email'>@{this.props.singleTweet.user.name.replaceAll(' ', '').toLowerCase()}</span> <span className='twit-time-ago'>{this.timeAgoCalculate(new Date(this.props.singleTweet.date))}</span></div>
                    <div>{this.props.singleTweet.content}</div>
                </div>
            </div>
        );
    }
}

export default SingleTwitt;