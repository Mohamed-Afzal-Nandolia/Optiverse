import React from "react";

const Post = ({ community, content, time }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow">
      <div className="text-sm text-blue-400 font-semibold">{community}</div>
      <p className="mt-2 text-white">{content}</p>
      <div className="text-xs text-gray-400 mt-2">{time}</div>
    </div>
  );
};

export default Post;
