import React, { useState } from "react";
import { FiImage, FiSmile, FiSend } from "react-icons/fi";
import { createPost } from "../../services/Api";

const PostCard = ({ onPostCreated }) => {
  const [post, setPost] = useState("");
  const user_id = localStorage.getItem("user");

  const handlePost = () => {
    if (post.trim()) {
      createPost({ post, user_id })
        .then((response) => {
          console.log(response);
          if (onPostCreated) onPostCreated();
          setPost("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-lg text-white space-y-4">
      <div className="flex gap-4 items-start">
        <textarea
          rows="3"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="How are you feeling today?"
          className="w-full resize-none p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-4 text-gray-400">
        </div>
        
        <button
          onClick={handlePost}
          disabled={!post.trim()}
          className="bg-blue-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
