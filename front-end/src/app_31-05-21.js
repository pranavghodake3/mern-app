import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import axios from 'axios';
import Post from './components/Post/Post';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  
  render(){
    var isLoggedIn = false;
    let loginMenu;
    let registrationLink;
    if(!isLoggedIn){
      loginMenu = <li className="nav-item"> <Link to="/login" className="nav-link">Login</Link> </li>
      registrationLink = <li className="nav-item"> <Link to="/registration" className="nav-link">Registration</Link> </li>
    }
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarExample01"
                aria-controls="navbarExample01"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fas fa-bars"></i>
              </button>
              <div className="collapse navbar-collapse" id="navbarExample01">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                  </li>
                  {loginMenu}
                  {registrationLink}
                </ul>
              </div>
            </div>
          </nav>
  
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/">
              <Post />
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

export default App;
