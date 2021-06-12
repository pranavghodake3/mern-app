import React, { Component, useState, useContext, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

const Profile = (props) => {
    const [state, setState] = useState({
        loadProfile: false,
        user: {},
        loggedInUserFullInfo: {}
    });
    const {handle} = useParams();
    console.log('handle: ', handle);

    
    const loadAjaxProfileByEmail = (email) => {
        axios.post('http://localhost:9002/users/byemail', {email: email})
        .then((res) => {
            this.setState({
                loadProfile: true,
                user: res.data.user
            });
            //console.log('this.state: ',this.state);
        })
        .catch((err) => {
            console.log('Err: ', err);
        })
    }
    const handleDoFollowUnfollow = () => {
        var authData = localStorage.getItem('authData');
        let headers;
        if(authData){
            authData = JSON.parse(authData);
            headers = { headers: {"Authorization" : "Bearer "+authData.accesstoken} };
        }
        const data = {
            user: this.state.user
        };

        axios.post('http://localhost:9002/users/followorunfollow', data, headers)
        .then((res) => {
            console.log('success: ',res.data);
        })
        .catch((err) => {
            console.log('Posting tweet having error: ', err)
        })
    }
    
    var texttt = 'Unfollow Diff';
    console.log('Profile render this.state: ',this.state);
    if(Object.keys(this.state.loggedInUserFullInfo).length != 0 && this.state.loggedInUserFullInfo.following.includes(this.state.user._id)){
        
        var texttt = 'Unfollow';
    }else{
        texttt = 'Follow';
    }
    return (
        <React.Fragment>
            {
                Object.keys(this.state.user).length != 0 &&
                <div className='full-profile'>
                    <div className='profile-picture'>
                        <img src={this.state.user.profile_url} alt='Profile-picture' />
                    </div>
                    <div className='follow-unfollow'>
                        <button type='button' className='btn btn-info' onClick={this.handleDoFollowUnfollow}>{texttt}</button>
                    </div>
                    <div className='user-basic-details'>
                    <strong>{this.state.user.name}</strong> <span className='user-email'>@{this.state.user.name.replaceAll(' ', '').toLowerCase()}</span>
                    </div>
                    <div className='followers-following-count'>
                        {this.state.user.following.length} Following {this.state.user.followers.length} Followers
                    </div>
                </div>
            }
        </React.Fragment>
        
    )
}

export default withRouter(Profile);