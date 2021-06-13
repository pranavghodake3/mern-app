import React, {useState, useEffect, useContext} from 'react';
import './LeftBar.css';
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from 'axios'
import UserContext from '../../contexts/UserContext'

const LeftBar = (props) =>{
    const history = useHistory();
    const [state, setState] = useState({
        loginLogoutText: 'Login',
        isLogged: false,
        name: '',
        profile_url: ''
    });
    var loginUserEmail = '';

    function handleLogout() {
        localStorage.removeItem('authData');
        history.replace('/login');
    }
    function handleViewLoggedinProfile(){
        props.loadProfile(loginUserEmail);
    }

    var userContextData = useContext(UserContext);
    console.log('LeftBar userContextData: ', userContextData);

    return (
        <div>
            <div>
                <ul className="left-menus">
                    <li><Link to='/home'>Home</Link></li>
                    <li>Explore</li>
                    <li>Notifications</li>
                    <li>Messages</li>
                    <li><button type='button' onClick={handleLogout} className='btn btn-primary' >{userContextData.isLogged ? 'Logout': 'Login'}</button></li>
                </ul>
            </div>
            { userContextData.isLogged &&
                <Link className='row login-user-profile hover' to={`/${userContextData.user.email}`}>
                    <div className='col-sm'>
                        <img src={userContextData.user.profile_url} alt='Login user profile' className='logged-user-profile' />
                    </div>
                    <div className='col-sm view-user-profile'>
                    <strong>{userContextData.user.name}</strong> <span className='user-email'>@{userContextData.user.name.replaceAll(' ', '').toLowerCase()}</span>
                    </div>
                </Link>
            }
        </div>
    )
}

export default LeftBar;
