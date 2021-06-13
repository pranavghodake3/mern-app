import React, { Component, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';
import UserContext from '../../../contexts/UserContext';

const Profile = (props) => {
    const userContextData = useContext(UserContext);
    const [state, setState] = useState({
        loadProfile: false,
        user: {},
        followUnfollowText: 'Follow'
    });
    const {username} = useParams();
    console.log('username: ', username);
    if(!state.loadProfile){
        if(username == userContextData.user.email){
            setState((prevState) => {
                return {
                    ...prevState,
                    loadProfile: true,
                    user: userContextData.user
                }
            });
        }else{
            axios.post('http://localhost:9002/users/byemail', {email: username})
            .then((res) => {
                setState((prevState) => {
                    return {
                        ...prevState,
                        loadProfile: true,
                        user: res.data.user,
                        followUnfollowText: userContextData.isLogged && userContextData.user.following.includes(res.data.user._id) ? 'Unfollow' : 'Follow'
                    }
                });
            })
            .catch((err) => {
                console.log('Err: ', err);
            })
        }
    }

    const handleDoFollowUnfollow = () => {
        var authData = localStorage.getItem('authData');
        let headers;
        if(authData){
            authData = JSON.parse(authData);
            headers = { headers: {"Authorization" : "Bearer "+authData.accesstoken} };
        }
        const data = {
            user: state.user
        };

        axios.post('http://localhost:9002/users/followorunfollow', data, headers)
        .then((res) => {
            console.log('success: ',res.data);
        })
        .catch((err) => {
            console.log('Posting tweet having error: ', err)
        })
    }
   
    return (
        <React.Fragment>
            {
                Object.keys(state.user).length != 0 &&
                <div className='full-profile'>
                    <div className='profile-picture'>
                        <img src={state.user.profile_url} alt='Profile-picture' />
                    </div>
                    {
                        state.user.email != userContextData.user.email && 
                        <div className='follow-unfollow'>
                            <button type='button' className='btn btn-info' onClick={handleDoFollowUnfollow}>{state.followUnfollowText}</button>
                        </div>
                    }
                    <div className='user-basic-details'>
                    <strong>{state.user.name}</strong> <span className='user-email'>@{state.user.name.replaceAll(' ', '').toLowerCase()}</span>
                    </div>
                    <div className='followers-following-count'>
                        {state.user.following.length} Following {state.user.followers.length} Followers
                    </div>
                </div>
            }
        </React.Fragment>
        
    )
}

export default Profile;