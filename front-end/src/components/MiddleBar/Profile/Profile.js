import React, { Component } from 'react';
import './Profile.css';
import axios from 'axios';

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loadProfile: false,
            user: {},
            loggedInUserFullInfo: {}
        }
    }
    componentDidMount(){
        //console.log('Profile Component loadProfile: ', this.props.loadProfile)
        //console.log('Profile Component loginUserEmail: ', this.props.loginUserEmail);
        //this.loadAjaxProfileByEmail(this.props.loginUserEmail);
        var authData = localStorage.getItem('authData');
        if(authData){
            authData = JSON.parse(authData);
            var headers = { headers: {"Authorization" : "Bearer "+authData.accesstoken} };
            axios.get('http://localhost:9002/auth/profile', headers)
            .then((res) => {
                this.setState({
                    loggedInUserFullInfo: res.data.user,
                });
            })
            .catch((err) => {
                console.log('Error: ',err);
            })
        }else{
            this.setState({
                loginLogoutText: 'Login'
            });
        }
    }
    loadAjaxProfileByEmail = (email) => {
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
    handleDoFollowUnfollow = () => {
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
    
    render() {
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
}

export default Profile;