import React, { useState, useEffect, useContext } from "react";
import "./LeftBar.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

const LeftBar = (props) => {
  const history = useHistory();
  var loginUserEmail = "";
  var userContextData = useContext(UserContext);
  var userObject = JSON.parse(userContextData.user);
  console.log("LeftBar userContextData: ", userContextData);
  console.log("Lefbar userObject: ", userObject);

  function handleLogout() {
    localStorage.removeItem("authData");
    userContextData.setUserObject(null);
    history.replace("/login");
  }

  return (
    <div>
      <div>
        <ul className="left-menus">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Explore</li>
          <li>Notifications</li>
          <li>Messages</li>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-primary"
            >
              {userContextData.isLogged ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      </div>
      {userContextData.isLogged && userObject != null && (
        <Link
          className="row login-user-profile hover"
          to={`/profile/${userObject.email}`}
        >
          <div className="col-sm">
            <img
              src={userObject.profile_url}
              alt="Login user profile"
              className="logged-user-profile"
            />
          </div>
          <div className="col-sm view-user-profile">
            <strong>{userObject.name}</strong>{" "}
            <span className="user-email">
              @{userObject.name.replaceAll(" ", "").toLowerCase()}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default LeftBar;
