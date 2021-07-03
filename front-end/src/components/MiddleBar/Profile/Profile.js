import React, { Component, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import axios from "axios";
import UserContext from "../../../contexts/UserContext";

const Profile = (props) => {
  const userContextData = useContext(UserContext);
  var userObject = JSON.parse(userContextData.user);
  const [state, setState] = useState({
    loadProfile: false,
    user: {},
    followUnfollowText: "Follow",
  });
  const { username } = useParams();
  console.log("username: ", username);
  var lodddd = false;
  if (username != state.user.email) {
    lodddd = true;
  }
  if (!state.loadProfile || lodddd) {
    if (username == userObject.email) {
      setState((prevState) => {
        return {
          ...prevState,
          loadProfile: true,
          user: userObject,
        };
      });
    } else {
      axios
        .post("http://localhost:9002/users/byemail", { email: username })
        .then((res) => {
          setState((prevState) => {
            return {
              ...prevState,
              loadProfile: true,
              user: res.data.user,
              followUnfollowText:
                userContextData.isLogged &&
                userObject.following.includes(res.data.user._id)
                  ? "Unfollow"
                  : "Follow",
            };
          });
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
    }
  }
  // useEffect(() => {

  // }, [username])

  const handleDoFollowOrUnfollow = () => {
    var authData = localStorage.getItem("authData");
    let headers;
    if (authData) {
      authData = JSON.parse(authData);
      headers = {
        headers: { Authorization: "Bearer " + authData.accesstoken },
      };
    }
    const data = {
      user: state.user,
    };

    axios
      .post("http://localhost:9002/users/followorunfollow", data, headers)
      .then((res) => {
        console.log("success: ", res.data);
        if (res.data.followed) {
          userContextData.setUserObject((prevState) => {
            return {
              ...prevState,
              following: [...prevState.following, state.user._id],
            };
          });
          setState((prevState) => {
            return {
              ...prevState,
              followUnfollowText: "Unfollow",
              user: res.data.user,
            };
          });
        } else {
          userContextData.setUserObject((prevState) => {
            let arrvalueIndex = prevState.following.indexOf(state.user._id);
            if (arrvalueIndex > -1) {
              prevState.following.splice(arrvalueIndex, 1);
            }
            return {
              ...prevState,
              following: prevState.following,
            };
          });
          setState((prevState) => {
            return {
              ...prevState,
              followUnfollowText: "Follow",
              user: res.data.user,
            };
          });
        }
      })
      .catch((err) => {
        console.log("Posting tweet having error: ", err);
      });
  };

  return (
    <React.Fragment>
      {Object.keys(state.user).length != 0 && (
        <div className="full-profile">
          <div className="profile-picture">
            <img src={state.user.profile_url} alt="Profile-picture" />
          </div>
          {state.user.email != userObject.email && (
            <div className="follow-unfollow">
              <button
                type="button"
                className="btn btn-info"
                onClick={handleDoFollowOrUnfollow}
              >
                {state.followUnfollowText}
              </button>
            </div>
          )}
          <div className="user-basic-details">
            <strong>{state.user.name}</strong>{" "}
            <span className="user-email">
              @{state.user.name.replaceAll(" ", "").toLowerCase()}
            </span>
          </div>
          <div className="followers-following-count">
            {state.user.following.length} Following{" "}
            {state.user.followers.length} Followers
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Profile;
