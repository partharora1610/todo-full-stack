/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { setAuthToken } from "../util/checkAuth";

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

  // useEffect(() => {
  //   // get the whole user by the id
  //   // Write a function to get a user object from the database...
  // }, []);

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
        setCurrentUser(data.currentUser);
        setLoggedIn(true);
        // updating the local storage
        setAuthToken(data.token);
      });
  };

  const logoutHandler = () => {
    setLoggedIn(false);
    setToken("");
    setCurrentUser({});
    localStorage.removeItem("key");
  };

  const signupHandler = (userObj, callback) => {
    fetch(`http://localhost:3000/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userObj }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setToken(data.token);
        setCurrentUser(data.currentUser);
        setLoggedIn(true);

        // updating the local storage
        setAuthToken(data.token);

        // calling the function here
        // The issue here is that I am calling the callback function even without checking whether the response is fine or not
        if (data) {
          callback("/home");
        }
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
