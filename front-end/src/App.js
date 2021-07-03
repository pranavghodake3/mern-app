import React, { Component, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import LeftBar from "./components/LeftBar/LeftBar";
import MiddleBar from "./components/MiddleBar/MiddleBar";
import RightBar from "./components/RightBar/RightBar";
import "./App.css";
import axios from "axios";
import UserContext from "./contexts/UserContext";
import Welcome from "./components/Welcome/Welcome";
import TopBar from "./components/TopBar/TopBar";

const App = (props) => {
  var storageAuthData = localStorage.getItem("authData");
  var storageAuthUser = localStorage.getItem("authUser");
  const [authData, setAuthDataState] = useState(storageAuthData);
  const [authUser, setAuthUserState] = useState(storageAuthUser);

  const setAuthDataObject = (authDataParam) => {
    console.log(
      "App.js setAuthDataObject called and value of authDataParam: ",
      authDataParam
    );
    setAuthDataState(authDataParam);
  };

  const setUserObject = (authUserParam) => {
    console.log(
      "App.js setUserObject called and value of authUser: ",
      authUserParam
    );
    setAuthUserState(authUserParam);
  };

  var intialContextValue = {
    authData: authData,
    isLogged: authData ? true : false,
    user: authUser,
    setAuthDataObject: setAuthDataObject,
    setUserObject: setUserObject,
  };

  return (
    <UserContext.Provider value={intialContextValue}>
      <Switch>
        {!intialContextValue.isLogged && (
          <Route path="/login" exact>
            <Login />
          </Route>
        )}
        {!intialContextValue.isLogged && (
          <Route path="/register" exact>
            <Registration />
          </Route>
        )}
        <Route path={["/", "/profile/:username"]} exact>
          {intialContextValue.isLogged ? (
            <div className="container app">
              <TopBar />
              <div className="row">
                <div className="col-sm hor-column">
                  <LeftBar />
                </div>
                <div className="col-sm hor-column">
                  <MiddleBar />
                </div>
                <div className="col-sm hor-column">
                  <RightBar />
                </div>
              </div>
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="*" exact>
          {intialContextValue.isLogged ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </UserContext.Provider>
  );
};

export default App;
