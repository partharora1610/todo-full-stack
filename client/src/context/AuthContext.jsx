/* eslint-disable react/prop-types */
import React, { useState } from "react";
// import { redirect } from "react-router-dom";

export const AuthContext = React.createContext({
  loggedIn: false,
  loggedUser: {},
  token: "",
  onLogin: () => {},
  onSignup: () => {},
  onLogout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");

  const loginHandler = (userObj) => {
    fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      headers: {},
      body: JSON.stringify({ ...userObj }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setToken(data.token);
        setCurrentUser();
        setLoggedIn(true);
        // navigate("/home");
        // navigate to the home page
      });
  };

  const logoutHandler = () => {
    setLoggedIn(false);
    setToken("");
    setCurrentUser({});
    // remove data from the local storage
    // navigate to the auth page
  };

  const signupHandler = (userObj) => {
    console.log(userObj);
    fetch(`http://localhost:3000/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userObj }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setToken(data.token);
        setCurrentUser();
        setLoggedIn(true);
        // navigate("/home");
        // update the local storage
        // navigate to the home page
      });
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn,
        loggedUser: currentUser,
        token: token,
        onLogin: loginHandler,
        onSignup: signupHandler,
        onLogout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
