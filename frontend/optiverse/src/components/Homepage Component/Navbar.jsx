import React from "react";
import MyProfile from "./MyProfile";

const Navbar = () => {
  return (
    <nav className="fixed top-2 w-full bg-[#001C3D] text-white shadow-md z-50">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold">OptiVerse</div>
        <ul className="flex gap-8 text-lg font-medium">
          <li className="hover:text-blue-400 cursor-pointer">Home</li>
          <li className="hover:text-blue-400 cursor-pointer">Topics</li>
          <li className="hover:text-blue-400 cursor-pointer">Your Posts</li>
          <li className="hover:text-blue-400 cursor-pointer">Messages</li>
          <li className="hover:text-blue-400 cursor-pointer">Notifications</li>
          <li className="hover:text-blue-400 cursor-pointer">Search</li>
        </ul>
        <div className="text-lg hover:text-blue-400 cursor-pointer"><MyProfile /></div>
      </div>
    </nav>
  );
};

export default Navbar;
