import React from 'react';
import './LeftBar.css';
import { Link, Redirect } from "react-router-dom";

class LeftBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loginLogoutText: '',
            isLogged: false,
            name: '',
            profile_url: ''
        }
    }
    componentDidMount(){
        let authData = localStorage.getItem('authData');
        if(authData){
            authData = JSON.parse(authData);
            this.setState({
                isLogged: true,
                name : authData.user.name,
                profile_url : authData.user.profile_url,
                loginLogoutText: 'Logout'
            });
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
    
    render(){
        return (
            <div>
                <div>
                    <ul className="left-menus">
                        <li>Explore</li>
                        <li>Notifications</li>
                        <li>Messages</li>
                        <li><Link to='/login' className="nav-link" onClick={this.handleLogout} className='btn btn-primary'>{this.state.loginLogoutText}</Link></li>
                    </ul>
                </div>
                { this.state.isLogged &&
                    <div className='row login-user-profile'>
                        <div className='col-sm'>
                            <img src={this.state.profile_url} alt='Login user profile' className='logged-user-profile' />
                        </div>
                        <div className='col-sm'>
                        <strong>{this.state.name}</strong> <span className='user-email'>@{this.state.name.replaceAll(' ', '').toLowerCase()}</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default LeftBar;
