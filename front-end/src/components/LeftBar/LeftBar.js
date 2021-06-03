import React from 'react';
import './LeftBar.css';
import { Link } from "react-router-dom";

class LeftBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            profile_url: ''
        }
    }
    componentDidMount(){
        let authData = localStorage.getItem('authData');
        if(authData){
            authData = JSON.parse(authData);
            this.setState({
                name : authData.user.name,
                profile_url : authData.user.profile_url
            });
        }
    }
    
    render(){
        return (
            <div>
                <div>
                    <ul className="left-menus">
                        <li><Link to="/login" className="nav-link">Login</Link></li>
                        <li>Explore</li>
                        <li>Notifications</li>
                        <li>Messages</li>
                    </ul>
                </div>
                <div className='row login-user-profile'>
                    <div className='col-sm'>
                        <img src={this.state.profile_url} alt='Login user profile' className='logged-user-profile' />
                    </div>
                    <div className='col-sm'>
                    <strong>{this.state.name}</strong> <span className='user-email'>@{this.state.name.replaceAll(' ', '').toLowerCase()}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default LeftBar;