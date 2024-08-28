import React from 'react';
import { Navigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";

const AdminRoute = ({ children }) => {
  const userData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  const isAdmin = userData && userData.profil === "admin";
  console.log("🚀🚀🚀🚀🚀 ~ AdminRoute ~ isAdmin:", userData)

  if (!isAdmin) {
    // Redirect to login or unauthorized page if not admin
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;