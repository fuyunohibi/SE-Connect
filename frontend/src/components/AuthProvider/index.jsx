import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: false,
  });

  useEffect(() => {
    if (authState.token) {
      setAuthState({ ...authState, isAuthenticated: true });
    } else {
      setAuthState({ ...authState, isAuthenticated: false });
    }
  }, [authState.token]);

  const setAuthToken = (token) => {
    localStorage.setItem("token", token);
    setAuthState({ ...authState, token, isAuthenticated: !!token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ ...authState, token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
