import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import MyProfile from "./MyProfile Component/MyProfile";
import { getAllPost } from "../../services/Api";

const Homepage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  // Load user from localStorage once on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Fetch posts when user is available
  useEffect(() => {
    if (user) {
      getAllPost(user)
        .then((res) => setPosts(res.data))
        .catch((err) => console.error("Initial post fetch failed:", err));
    }
  }, [user]);

  const handleProfileToggle = () => setShowProfile((prev) => !prev);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#001C3D] text-white">
      <div className="border-b border-gray-700 py-8">
        <Navbar onProfileClick={handleProfileToggle} setPosts={setPosts} />
      </div>
      <div className="grid grid-cols-12 gap-4">
        {/* Left Sidebar */}
        <div className="col-span-3 border-r border-gray-700 min-h-[calc(100vh-3.5rem)]">
          <Sidebar />
        </div>

        {/* Feed Section */}
        <div className="col-span-6 px-15 py-6">
          {showProfile ? (
            <MyProfile />
          ) : (
            <Feed posts={posts} setPosts={setPosts} />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3 border-l border-gray-700 min-h-[calc(100vh-3.5rem)]">
          <div className="p-4">Right Sidebar (Coming Soon)</div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
