import React, { useState } from "react";
import { FiImage, FiSmile, FiSend } from "react-icons/fi";

const PostCard = () => {
  const [postContent, setPostContent] = useState("");

  const handlePost = () => {
    if (postContent.trim()) {
      console.log("Posted:", postContent);
      setPostContent("");
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-lg text-white space-y-4">
      {/* Top: Avatar + Input */}
      <div className="flex gap-4 items-start">
        {/* Text Area */}
        <textarea
          rows="3"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="How are you feeling today?"
          className="w-full resize-none p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bottom: Action Buttons + Post */}
      <div className="flex items-center justify-between">
        {/* Icons */}
        <div className="flex gap-4 text-gray-400">
          {/* <button className="hover:text-blue-400 transition">
            <FiImage size={20} />
          </button>
          <button
            title="Press Win + . to open emoji picker"
            className="hover:text-yellow-400 transition"
          >
            <FiSmile size={20} />
          </button> */}
        </div>

        {/* Post Button */}
        <button
          onClick={handlePost}
          disabled={!postContent.trim()}
          className="bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
