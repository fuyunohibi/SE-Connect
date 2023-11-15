import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { authState } = useContext(AuthContext);

  console.log("authState: ", authState);

  if (!authState.isAuthenticated) {
    return <Navigate to="/auth/login/identifier" />;
  }

  return children;
};

export default ProtectedRoute;
