import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import LeftBar from './components/LeftBar/LeftBar';
import MiddleBar from './components/MiddleBar/MiddleBar';
import RightBar from './components/RightBar/RightBar';
import './App.css';
import logo from './twitter-logo.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadProfile: false,
      loginUserEmail: ''
    }
    this.middlebarElement = React.createRef();
  }
  handleLoadUserProfile = (loginUserEmail) => {
    console.log('app.js handleLoadProfile loginUserEmail param: '+loginUserEmail);
    this.setState({
      loadProfile: true,
      loginUserEmail: loginUserEmail
    });
    this.middlebarElement.current.handleLoadUserProfile(loginUserEmail);
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path={['/', '/profile']}>
            <div className="container app">
              <div className="row header-row">
                <div className="col-sm hor-column">
                    <div className="logo-div">
                      <img className='logo' src={logo} alt="logo" />
                    </div>
                </div>
                <div className="col-sm hor-column">
                  Home
                </div>
                <div className="col-sm hor-column">
                  <input type="text" className='search' placeholder='Search' />
                </div>
              </div>
              <div className="row">
                <div className="col-sm hor-column">
                  <LeftBar loadProfile={this.handleLoadUserProfile} />
                </div>
                <div className="col-sm hor-column">
                  <MiddleBar ref={this.middlebarElement} handleLoadUserProfile={this.handleLoadUserProfile} />
                </div>
                <div className="col-sm hor-column">
                  <RightBar />
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

