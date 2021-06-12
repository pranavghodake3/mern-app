import React, { Component } from 'react';
import './CreateTwit.css';
import userProfile from './logged-user-profile.jpeg';
import axios from 'axios';

class ClassCreateTwit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            loginUserProfile: ''
        }
    }
    handleTweetSubmit = (e) => {
        e.preventDefault();
        console.log("ssss: ",this.state);
        const data = {
            content: this.state.content
        };

        var authData = localStorage.getItem('authData');
        if(authData){
            authData = JSON.parse(authData);
            var headers = { headers: {"Authorization" : "Bearer "+authData.accesstoken} };
            axios.get('http://localhost:9002/auth/profile', headers)
            .then((res) => {
                axios.post('http://localhost:9002/tweets', data, headers)
                .then((res) => {
                    console.log('success: ',res.data);
                    this.setState({ content: '' });
                })
                .catch((err) => {
                    console.log('Posting tweet having error: ', err)
                })
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
    handleTweetContentChange = (e) => {
        this.setState({ content: e.target.value });
    }
    componentDidMount(){
        var authData = localStorage.getItem('authData');
        if(authData){
            authData = JSON.parse(authData);
            axios.get('http://localhost:9002/auth/profile')
            .then((res) => {
                this.setState({
                    loginUserProfile : res.data.profile_url
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
    
    
    render(){
        return (
            <div className="row create-twit">
                <div className="col-sm user-profile">
                    <img src={this.state.loginUserProfile} alt='User Profile' />
                </div>
                <div className="col-sm">
                    <form onSubmit={this.handleTweetSubmit}>
                        <div>
                            <textarea className='text-area-create-twit' placeholder='Whats happening ?' required='required' onChange={this.handleTweetContentChange} value={this.state.content} />
                        </div>
                        <div>
                            <button type='submit' className='create-tweet-btn btn btn-info'>Tweet</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ClassCreateTwit;