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
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");

  const loginHandler = (userObj) => {
    fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userObj }),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token);
        setCurrentUser();
        setLoggedIn(true);
      });
  };

  const logoutHandler = () => {
    setLoggedIn(false);
    setToken("");
    setCurrentUser({});
    localStorage.removeItem("key");
  };

  const signupHandler = (userObj) => {
    fetch(`http://localhost:3000/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userObj }),
    })
      .then((response) => response.json())
      .then((data) => {
        setToken(data.token);
        setLoggedIn(true);
        console.log(data.token);
        localStorage.setItem("key", token);
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
