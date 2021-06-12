import React from 'react';
import './LeftBar.css';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'
import UserContext from '../../UserContext'

class ClassLeftBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loginLogoutText: 'Login',
            isLogged: false,
            name: '',
            profile_url: ''
        }
    }
    componentDidMount(){
        var authData = localStorage.getItem('authData');
        if(authData){
            authData = JSON.parse(authData);
            var headers = { headers: {"Authorization" : "Bearer "+authData.accesstoken} };
            axios.get('http://localhost:9002/auth/profile', headers)
            .then((res) => {
                this.loginUserEmail = res.data.email;
                this.setState({
                    isLogged: true,
                    name : res.data.name,
                    profile_url : res.data.profile_url,
                    loginLogoutText: 'Logout'
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
    handleLogout = (e) => {
        localStorage.removeItem('authData');
        this.setState({
            loginLogoutText: 'Login'
        });
    }
    handleViewLoggedinProfile = () => {
        //console.log('this.loginUserEmail: ',this.loginUserEmail);
        this.props.loadProfile(this.loginUserEmail);
    }
    
    render(){
        return (
            <UserContext.Consumer>
                {
                    (currentUser) => {
                        return (
                            <div>
                                <div>
                                    <ul className="left-menus">
                                        <li>Explore =========- {currentUser.name}</li>
                                        <li>Notifications</li>
                                        <li>Messages</li>
                                        <li><Link to='/login' className="nav-link" onClick={this.handleLogout} className='btn btn-primary'>{this.state.loginLogoutText}</Link></li>
                                    </ul>
                                </div>
                                { this.state.isLogged &&
                                    <div className='row login-user-profile hover' onClick={this.handleViewLoggedinProfile}>
                                        <div className='col-sm'>
                                            <img src={this.state.profile_url} alt='Login user profile' className='logged-user-profile' />
                                        </div>
                                        <div className='col-sm view-user-profile' onClick={this.handleViewProfile}>
                                        <strong>{this.state.name}</strong> <span className='user-email'>@{this.state.name.replaceAll(' ', '').toLowerCase()}</span>
                                        </div>
                                    </div>
                                }
                            </div>
                        );
                    }
                }
            </UserContext.Consumer>
        )
    }
}

export default ClassLeftBar;
