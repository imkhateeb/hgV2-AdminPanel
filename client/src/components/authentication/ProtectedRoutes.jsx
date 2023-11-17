// ProtectedRoute.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/account/login");
    }
  }, []);

  return children;
};

export default ProtectedRoute;
