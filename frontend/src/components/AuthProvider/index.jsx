import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userProfile = localStorage.getItem("userProfile");

    if (token && userProfile) {
      setAuthState({
        token: token,
        isAuthenticated: true,
        isLoading: false,
        user: JSON.parse(userProfile),
      });
    } else {
      setAuthState({
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      });
    }
  }, []);

  const authenticateUser = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userProfile", JSON.stringify(user));
    setAuthState({ token, isAuthenticated: !!token, isLoading: false, user });
  };
  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({ ...authState, token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ authState, authenticateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
