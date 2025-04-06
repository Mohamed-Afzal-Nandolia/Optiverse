// PostBox.jsx
import React from "react";

const PostCard = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <input
        type="text"
        placeholder="How are you feeling today?"
        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default PostCard;
