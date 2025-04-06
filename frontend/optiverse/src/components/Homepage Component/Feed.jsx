import React from "react";
import PostBox from "../Homepage Component/PostCard";
import Post from "../Homepage Component/Post";

const Feed = () => {
  return (
    <div className="space-y-6">
      <PostBox />
      <Post
        community="O/PositiveAffirmation"
        content="You’re doing your best and that’s enough. 🌟"
        time="2 hours ago"
      />
      <Post
        community="O/InspiringStories"
        content="A stranger paid my college tuition. Still gives me chills!"
        time="4 hours ago"
      />
      <Post
        community="O/SelfImprovementAndGrowth"
        content="Started journaling daily. 10 days in, and already noticing clarity. ✨"
        time="Yesterday"
      />
    </div>
  );
};

export default Feed;
