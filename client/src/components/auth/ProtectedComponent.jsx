import React from "react";
import { Navigate, Outlet } from "react-router";
import Loader from "../loader/Loader";

function ProtectedComponent({ children, user, authChecked, redirect = "/" }) {
  // If user state is still loading, prevent immediate redirection
  if(!authChecked) return <Loader></Loader>
  if (!user) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedComponent;
