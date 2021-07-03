import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import UserContext from "../../contexts/UserContext";

function Login(props) {
  const history = useHistory();
  const userCtx = useContext(UserContext);
  console.log("Login userCtx: ", userCtx);
  const [formDetails, setState] = useState({
    email: "",
    password: "",
    formStatusMessage: "",
  });

  function handleInputChange(e) {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleLoginForm(e) {
    e.preventDefault();
    console.log("formDetails: ", formDetails);
    console.log("BEFORE Axios");
    axios
      .post("http://localhost:9002/auth/login", formDetails)
      .then((res) => {
        console.log("Login Success res.data: ", res.data);
        var expiresIn = res.data.data.expiresIn;
        var storageData = res.data.data;

        var headers = {
          headers: { Authorization: "Bearer " + res.data.data.accesstoken },
        };
        axios
          .get("http://localhost:9002/auth/profile", headers)
          .then((res) => {
            console.log("Profile call res.data: ", res.data);
            localStorage.setItem("authData", JSON.stringify(storageData));

            localStorage.setItem("authUser", JSON.stringify(res.data));
            userCtx.setAuthDataObject(storageData);
            console.log("GOING to call setUserObject");
            userCtx.setUserObject(res.data);

            //userCtx.autoLogout(expiresIn);
            history.replace("/");
          })
          .catch((err) => {
            console.log("Error: ", err);
          });
      })
      .catch((err) => {
        console.log("Error: ", err);
        setState((prevState) => {
          return { ...prevState, formStatusMessage: "Invalid credentials" };
        });
      });
    console.log("AFTER Axios");
  }

  return (
    <div className="container login-screen">
      <form onSubmit={handleLoginForm} method="post">
        <div className="container">
          <h2 className="heading-title">Login</h2>
          <h3>{formDetails.formStatusMessage}</h3>
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={handleInputChange}
            value={formDetails.email}
            required
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formDetails.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Login</button>
        </div>

        <div className="container">
          <Link to="/register" className="btn btn-primary">
            Don't have an account ?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
