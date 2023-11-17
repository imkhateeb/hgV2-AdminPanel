import React from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/account/login");
  };

  return (
    <div className="logout-button">
      <button
        onClick={handleLogout}
        className="bg-white text-black rounded-md px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
