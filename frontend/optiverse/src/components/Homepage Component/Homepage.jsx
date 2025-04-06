// Homepage.jsx
import React from "react";
import Navbar from "../Homepage Component/NavBar";
import Sidebar from "../Homepage Component/Sidebar";
import Feed from "../Homepage Component/Feed";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#001C3D]  text-white">
      <div className="border-b border-gray-700 py-8">
        <Navbar />
      </div>
      <div className="grid grid-cols-12 gap-4">
        {/* Left Sidebar */}
        <div className="col-span-3 border-r border-gray-700 min-h-[calc(100vh-3.5rem)]">
          <Sidebar />
        </div>

        {/* Feed Section */}
        <div className="col-span-6 px-15 py-6">
          <Feed />
        </div>

        {/* Right Sidebar Placeholder */}
        <div className="col-span-3 border-l border-gray-700 min-h-[calc(100vh-3.5rem)]">
          <div className="p-4">Right Sidebar (Coming Soon)</div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
