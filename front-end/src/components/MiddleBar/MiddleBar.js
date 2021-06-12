import React, { Component, useContext, useState } from 'react';
import TwitterList from './TwitterList/TwitterList';
import CreateTwit from './CreateTwit/CreateTwit';
import Profile from './Profile/Profile';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import { BrowserRouter, Switch, Route, useParams,withRouter } from "react-router-dom";

const MiddleBar = (props) => {
    const [state, setState] = useState({
        isLogged: false
    });
    var currentUser = useContext(UserContext);
    const {handle} = useParams();

    return (
        <BrowserRouter>
            <Switch>
                <Route path={["/"]}>
                    <div>
                        { currentUser != null && <CreateTwit /> }
                        <TwitterList handleViewOtherUserProfile='' />
                    </div>
                </Route>
                <Route path={["/:handle"]}>
                    <Profile loadProfile={true} loginUserEmail={handle} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default withRouter(MiddleBar);