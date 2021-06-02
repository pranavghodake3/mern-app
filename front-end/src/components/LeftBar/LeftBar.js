import React from 'react';
import './LeftBar.css';
import { Link } from "react-router-dom";

class LeftBar extends React.Component{
    render(){
        return (
            <div>
                <div>
                    <ul className="left-menus">
                        <li><Link to="/login" className="nav-link">Login</Link></li>
                        <li>Explore</li>
                        <li>Notifications</li>
                        <li>Messages</li>
                        <li>Profile</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default LeftBar;