import React from "react";
import { Navigate, Outlet } from "react-router";

function ProtectedComponent({ children, user, authChecked, redirect = "/" }) {
  // If user state is still loading, prevent immediate redirection
  if(!authChecked) return <div>Loading...</div>
  if (!user) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedComponent;
