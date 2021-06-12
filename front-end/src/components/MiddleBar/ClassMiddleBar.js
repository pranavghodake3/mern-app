import React, { Component } from 'react';
import TwitterList from './TwitterList/TwitterList';
import CreateTwit from './CreateTwit/CreateTwit';
import Profile from './Profile/Profile';
import axios from 'axios'

class ClassMiddleBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
        this.profileElement = React.createRef();
    }
    componentDidMount(){
        var authData = localStorage.getItem('authData');
        if(authData){
            authData = JSON.parse(authData);
            axios.get('http://localhost:9002/auth/profile')
            .then((res) => {
                this.setState({
                    isLogged: true,
                    loadProfile: false,
                    loginUserEmail: res.data.email
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
    handleViewOtherUserProfile = (email) => {
        //console.log('MiddleBar handleViewUserProfile email: '+email);
        this.props.handleLoadUserProfile(email);
    }
    handleLoadUserProfile = (loginUserEmail) => {
        //console.log('MiddleBar loginUserEmail params: '+loginUserEmail);
        this.setState({
            loadProfile: true,
            loginUserEmail: loginUserEmail
        });
        this.profileElement.current.loadAjaxProfileByEmail(loginUserEmail);
    }
    
    render() {
        return (
            <div>
                {<Profile ref={this.profileElement} loadProfile={this.state.loadProfile} loginUserEmail={this.state.loginUserEmail} />}
                { this.state.isLogged && !this.state.loadProfile && <CreateTwit /> }
                <TwitterList handleViewOtherUserProfile={this.handleViewOtherUserProfile} />
            </div>
        );
    }
}

export default ClassMiddleBar;