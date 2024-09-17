import React, { FC } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const apiKey = localStorage.getItem("hmb-api-key");

  if (!apiKey) {
    // If no API key exists, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If API key exists, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;
