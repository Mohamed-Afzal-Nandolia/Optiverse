import React from "react";
import MyProfile from "./MyProfile";
import { Link } from "react-router-dom";
import logo from "/assets/logos/Optiverse.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full text-white shadow-md z-50">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Brand Name */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src={logo} alt="OptiVerse Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold">OptiVerse</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-lg font-medium">
          <li className="hover:text-blue-400 cursor-pointer">Home</li>
          <li className="hover:text-blue-400 cursor-pointer">Topics</li>
          <li className="hover:text-blue-400 cursor-pointer">Your Posts</li>
          <li className="hover:text-blue-400 cursor-pointer">Messages</li>
          <li className="hover:text-blue-400 cursor-pointer">Notifications</li>
          {/* <li className="hover:text-blue-400 cursor-pointer">Search</li> */}
        </ul>
            {/* Search Bar */}
            <div className="relative">
                <input
                type="text"
                placeholder="Search"
                className="px-4 py-1.5 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
        {/* Profile Dropdown */}
        <div className="text-lg hover:text-blue-400 cursor-pointer">
          <MyProfile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
