import React, { useState, useEffect } from 'react';
import { useDecodedToken } from "../../../utils/useDecodedToken";

const MyProfile = () => {
  // Dummy data for posts (replace with real data in the future)
  const [posts, setPosts] = useState([
    { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the content of the second post.' },
    { id: 3, title: 'Third Post', content: 'This is the content of the third post.' }
  ]);

  const username = useDecodedToken(); // Get the username from the token

  if (!username) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Welcome to your Profile, {username}</h1>
      
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-white">Your Posts</h2>
        <div className="space-y-4 mt-4 text-white">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="border p-4 rounded-md shadow-md ">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))
          ) : (
            <p>No posts yet. Stay tuned!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;