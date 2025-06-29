// Feed.jsx
import React from "react";
import Post from "./Post";
import PostCard from "./PostCard";

const Feed = ({ posts, setPosts }) => {
  const username = localStorage.getItem("username");

  const handlePostCreated = () => {
    const user = localStorage.getItem("user");
    import("../../services/Api").then(({ getAllPost }) => {
      getAllPost(user).then((res) => setPosts(res.data));
    });
  };

  return (
    <div className="space-y-4">
      <PostCard onPostCreated={handlePostCreated} />

      {posts.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-10">No posts found.</div>
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            community={username}
            content={post.post}
            time={new Date(post.date).toLocaleString()}
          />
        ))
      )}
    </div>
  );
};

export default Feed;
