import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

var authData = localStorage.getItem("authData");
var initialContextData = {
  isLogged: authData ? true : false,
  user: {},
  setUserObject: () => {},
};
console.log("initialContextData: ", initialContextData);
const UserContext = React.createContext(initialContextData);

export const UserContextProvider = (props) => {
  const history = useHistory();
  var authData = localStorage.getItem("authData");
  let defaultUserObject = null;
  if (authData) {
    //defaultUserObject = {_id: '1212sdfsd', 'name': 'Pranav', 'email': 'pranav@test.com'};
    console.log("UserContext is going to authData set User object");
    var headers = {
      headers: { Authorization: "Bearer " + authData.accesstoken },
    };
    axios
      .get("http://localhost:9002/auth/profile", headers)
      .then((res) => {
        defaultUserObject = res.data;
        console.log("UserContext is SET authData set User object");
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  }
  const [userObject, setUserObject] = useState(defaultUserObject);
  const [isLogged, setIsLogged] = useState(false);

  const autoLogout = (expiresIn) => {
    setTimeout(() => {
      localStorage.removeItem("authData");
      setUserObject(null);
      history.replace("/login");
    }, expiresIn);
  };

  const contextValue = {
    isLogged: isLogged,
    user: userObject,
    setUserObject: setUserObject,
    setIsLogged: setIsLogged,
    //autoLogout: autoLogout
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
