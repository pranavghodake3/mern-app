import React, { Component, useContext, useState, useEffect } from "react";
import "./CreateTwit.css";
import userProfile from "./logged-user-profile.jpeg";
import axios from "axios";
import UserContext from "../../../contexts/UserContext";

const CreateTwit = (props) => {
  const [tweetContent, setTweetContent] = useState("");

  const userContextData = useContext(UserContext);
  var userObject = JSON.parse(userContextData.user);
  console.log("CreateTwit userContextData: ", userContextData);

  const handleTweetSubmit = (e) => {
    e.preventDefault();

    var authData = localStorage.getItem("authData");
    if (authData) {
      authData = JSON.parse(authData);
      var headers = {
        headers: { Authorization: "Bearer " + authData.accesstoken },
      };
      axios
        .post(
          "http://localhost:9002/tweets",
          { content: tweetContent },
          headers
        )
        .then((res) => {
          console.log("Tweet created successfully res.data: ", res.data);
          setTweetContent("");
        })
        .catch((err) => {
          console.log("Posting tweet having error: ", err);
        });
    }
  };
  const handleTweetContentChange = (e) => {
    setTweetContent(e.target.value);
  };

  return (
    <div className="row create-twit">
      <div className="col-sm user-profile">
        <img src={userObject && userObject.profile_url} alt="User Profile" />
      </div>
      <div className="col-sm">
        <form onSubmit={handleTweetSubmit}>
          <div>
            <textarea
              className="text-area-create-twit"
              placeholder="Whats happening ?"
              required="required"
              onChange={handleTweetContentChange}
              value={tweetContent}
            />
          </div>
          <div>
            <button type="submit" className="create-tweet-btn btn btn-info">
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTwit;
