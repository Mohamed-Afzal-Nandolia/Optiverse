import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import logo from "/assets/logos/Optiverse.png";
import { getAllPost } from "../../services/Api";

const Navbar = ({ onProfileClick, setPosts }) => {
  const [filter, setFilter] = useState("");
  const user = localStorage.getItem("user");

  // Debounce timer
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (filter.trim() && user) {
        const filters = [["post", "like", filter.trim()]];
        getAllPost(user, filters)
          .then((res) => {
            setPosts(res.data);
          })
          .catch((err) => {
            console.error("Live filter failed:", err);
          });
      } else if (user && filter.trim() === "") {
        // If input cleared, refetch all posts
        getAllPost(user)
          .then((res) => setPosts(res.data))
          .catch((err) => console.error("Reset fetch failed:", err));
      }
    }, 500); // ⏱ 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [filter, user]);

  return (
    <nav className="fixed top-0 w-full text-white shadow-md z-50">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Brand Name */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <img src={logo} alt="OptiVerse Logo" className="w-10 h-10 object-contain" />
          <span className="text-2xl font-bold">Optiverse</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-lg font-medium">
          <Link to="/"><li className="hover:text-blue-400 cursor-pointer">Home</li></Link>
          <li className="hover:text-blue-400 cursor-pointer">Topics</li>
          <li className="hover:text-blue-400 cursor-pointer">Messages</li>
          <li className="hover:text-blue-400 cursor-pointer">Notifications</li>
        </ul>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-1.5 rounded-md bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Profile Dropdown */}
        <div className="text-lg hover:text-blue-400 cursor-pointer">
          <Profile onProfileClick={onProfileClick} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
