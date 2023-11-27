// ProtectedRoute.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, useNavigate } from "react-router-dom";
import axios from "axios";

import { loginSuccess } from "../../redux/slices/authSlice";
const url = import.meta.env.VITE_APP_BACKEND_URI;

console.log(url);

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  console.log(isAuthenticated);

  const chechAuth = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    if (token) {
      const res = await axios.get(`${url}/api/users/validate`, {
        headers: {
          authorization: `Bearer ${token}`,
          send: "userdata",
        },
      });

      if (res.data.success) {
        dispatch(loginSuccess(res.data.user));
       
        navigate("/");
      } else {
        localStorage.removeItem("token");
        navigate("/account/login");
      }
    } else {
      navigate("/account/login");
    }
  };

  useEffect(() => {
    chechAuth();
  }, []);

  return children;
};

export default ProtectedRoute;
