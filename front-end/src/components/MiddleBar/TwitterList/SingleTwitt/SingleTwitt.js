import React, { Component } from 'react';
import './SingleTwitt.css';
import userProfile from './user-profile.png';

class SingleTwitt extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="row single-twit">
                <div className="col-sm user-profile">
                    <img src={this.props.singleTweet.user.profile} />
                </div>
                <div className="col-sm">
                    <div><strong>{this.props.singleTweet.user.name}</strong> <span className='user-email'>@{this.props.singleTweet.user.email}</span> <span className='twit-time-ago'>5m</span></div>
                    <div>{this.props.singleTweet.content}</div>
                </div>
            </div>
        );
    }
}

export default SingleTwitt;