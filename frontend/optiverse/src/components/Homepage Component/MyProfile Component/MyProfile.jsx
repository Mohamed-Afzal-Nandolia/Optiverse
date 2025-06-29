import React, { useEffect, useState } from "react";
import { getPostWithId } from "../../../services/Api";
import Post from "../Post";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("user");

  useEffect(() => {
    if (userId) {
      getPostWithId(userId)
        .then((res) => setPosts(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-white text-xl font-semibold mb-4">Your Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post.id}
            community={"You"}
            content={post.post}
            time={new Date(post.date).toLocaleString()}
          />
        ))
      ) : (
        <p className="text-gray-400">You haven't posted anything yet.</p>
      )}
    </div>
  );
};

export default MyProfile;