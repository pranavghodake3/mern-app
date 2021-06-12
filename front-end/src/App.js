import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import LeftBar from "./components/LeftBar/LeftBar";
import MiddleBar from "./components/MiddleBar/MiddleBar";
import RightBar from "./components/RightBar/RightBar";
import "./App.css";
import logo from "./twitter-logo.jpg";
import axios from 'axios';
import UserContext from './contexts/UserContext';

//const ThemeContext = React.createContext('light');



const App = (props) => {
  const history = useHistory();
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loadProfile: false,
  //     loginUserEmail: ''
  //   }
  //   this.middlebarElement = React.createRef();
  // }
  // function handleLoadUserProfile() {
  //   console.log(
  //     "app.js handleLoadProfile loginUserEmail param: " + loginUserEmail
  //   );
  //   this.setState({
  //     loadProfile: true,
  //     loginUserEmail: loginUserEmail,
  //   });
  //   this.middlebarElement.current.handleLoadUserProfile(loginUserEmail);
  // }
  var userObject = {};
  useEffect(() => {
    // var authData = localStorage.getItem('authData');
    // if(authData){
    //     authData = JSON.parse(authData);
    //     console.log('Add.js authData: ', authData);
    //     var headers = { headers: {"Authorization" : "Bearer "+authData.accesstoken} };
    //     axios.get('http://localhost:9002/auth/profile', headers)
    //     .then((res) => {
    //       userObject = res.data;
    //       console.log('Success profile got');
    //     })
    //     .catch((err) => {
    //         console.log('Error: ',err);
    //     })
    // }
    // console.log('App.js userObject: ',userObject)
  })

  const [currentUser, setCurrentUser] = useState(null)

  function handleToSetCurrentUser(user){
    setCurrentUser(user);
    console.log('App.js Set Logged user info to UserContext: ', user);
  }

  
  return (
    <Router history={history}>
      <UserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/login">
            <Login propToSetCurrentUser={handleToSetCurrentUser} />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path={["/:handle"]}>
              HHHHH
          </Route>
          <Route path={["/", "/profile"]}>
            <div className="container app">
              <div className="row header-row">
                <div className="col-sm hor-column">
                  <div className="logo-div">
                    <img className="logo" src={logo} alt="logo" />
                  </div>
                </div>
                <div className="col-sm hor-column">Home</div>
                <div className="col-sm hor-column">
                  <input type="text" className="search" placeholder="Search" />
                </div>
              </div>
              <div className="row">
                <div className="col-sm hor-column">
                  <LeftBar loadProfile='' /*loadProfile={this.handleLoadUserProfile}*/ />
                </div>
                <div className="col-sm hor-column">
                  {/* <MiddleBar
                    ref={this.middlebarElement}
                    handleLoadUserProfile={this.handleLoadUserProfile}
                  /> */}
                  <MiddleBar />
                </div>
                <div className="col-sm hor-column">
                  <RightBar />
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
