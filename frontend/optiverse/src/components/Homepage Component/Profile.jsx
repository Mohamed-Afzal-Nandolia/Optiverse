import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDecodedToken } from "../../utils/useDecodedToken";

const Profile = ({ onProfileClick }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const username = useDecodedToken();
  const [isProfile, setIsProfile] = useState(true);
  
  const handleToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleOptionClick = () => {
    setOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfile((prev) => !prev);
    onProfileClick();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button 
        onClick={handleToggle}
        className="flex items-center gap-2 px-4 py-2 rounded-md"
      >
        <div>{username ? `${username}` : '404'}</div>       
      </button>

      {open && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <div className="py-2">
            <button
              onClick={() => { handleProfileToggle(); handleOptionClick(); }}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              {isProfile ? "My Profile" : "Feed"}
            </button>

            <button
              onClick={() => { handleLogout(); handleOptionClick(); }}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
