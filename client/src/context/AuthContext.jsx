/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { getAuthToken, setAuthToken } from "../util/checkAuth";

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

  useEffect(() => {
    async () => {
      const token = getAuthToken();

      // Need to get the token here
      // Get the user object
      // Update the states in the app
    };
  }, []);

  const loginHandler = (userObj, callback) => {
    fetch(`http://localhost:3000/auth/login`, {
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
        setAuthToken(data.token);

        // changing the state of the user
        if (data) {
          callback("/home");
        }
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

        setAuthToken(data.token);

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

/**
 * Two things that I need to implement
 * 1. Reload and preserve the login state
 * 2. Create date wise task
 * 3. Ensure all routes are working perfectly fine.
 */
