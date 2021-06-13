import React, { Component, useContext, useState } from 'react';
import TwitterList from './TwitterList/TwitterList';
import CreateTwit from './CreateTwit/CreateTwit';
import Profile from './Profile/Profile';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import { BrowserRouter, Switch, Route, useParams } from "react-router-dom";

const MiddleBar = (props) => {
    const [state, setState] = useState({
        isLogged: false
    });
    var userContextData = useContext(UserContext);
    console.log('MiddleBar userContextData: ',userContextData);
    const {handle} = useParams();

    return (
        <Switch>
            <Route path='/home' exact>
                <div>
                    { userContextData.isLogged && <CreateTwit /> }
                    <TwitterList handleViewOtherUserProfile='' />
                </div>
            </Route>
            <Route path='/:username' exact>
                <Profile loadProfile={true} loginUserEmail={handle} />
            </Route>
        </Switch>
        // <div>
        //     { userContextData.isLogged && <CreateTwit /> }
        //     <TwitterList handleViewOtherUserProfile='' />
        // </div>
    );
}

export default MiddleBar;