import React from 'react';
import './LeftBar.css';

class LeftBar extends React.Component{
    render(){
        return (
            <div>
                <div>
                    <ul className="left-menus">
                        <li>Home</li>
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