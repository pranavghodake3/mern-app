import React, {useState, useEffect, useContext} from 'react';
import './LeftBar.css';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'
import UserContext from '../../contexts/UserContext'

const LeftBar = (props) =>{
    const [state, setState] = useState({
        loginLogoutText: 'Login',
        isLogged: false,
        name: '',
        profile_url: ''
    });
    var loginUserEmail = '';

    function handleLogout() {
        localStorage.removeItem('authData');
        setState((prevState) => {
            return {
                ...prevState,
                loginLogoutText: 'Login'
            }
        });
    }
    function handleViewLoggedinProfile(){
        props.loadProfile(loginUserEmail);
    }

    var currentUser = useContext(UserContext);

    return (
        <div>
            <div>
                <ul className="left-menus">
                    <li>Explore</li>
                    <li>Notifications</li>
                    <li>Messages</li>
                    <li><Link to='/login' className="nav-link" onClick={handleLogout} className='btn btn-primary'>{state.loginLogoutText}</Link></li>
                </ul>
            </div>
            { currentUser &&
                <div className='row login-user-profile hover' onClick={handleViewLoggedinProfile}>
                    <div className='col-sm'>
                        <img src={currentUser.profile_url} alt='Login user profile' className='logged-user-profile' />
                    </div>
                    <div className='col-sm view-user-profile'>
                    <strong>{currentUser.name}</strong> <span className='user-email'>@{currentUser.name.replaceAll(' ', '').toLowerCase()}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default LeftBar;
