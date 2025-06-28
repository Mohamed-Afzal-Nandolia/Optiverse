import React, { useEffect, useState } from "react";
import { getAllPost } from "../../services/Api";
import Post from "./Post";
import PostCard from "./PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const user = localStorage.getItem("user");

  const fetchPosts = () => {
    if (user) {
      getAllPost(user)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch posts:", error.response?.data || error.message);
        });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return (
    <div className="space-y-4">
      <PostCard onPostCreated={fetchPosts} />
      {posts.map((post) => (
        <Post
          key={post.id}
          community={`User ${post.user}`}
          content={post.post}
          time={new Date(post.date).toLocaleString()}
        />
      ))}
    </div>
  );
};

export default Feed;
