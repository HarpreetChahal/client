import React, { useEffect, useState, useContext } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";

export default function Feed({posts,fetchPosts}) {
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      fetchPosts();
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share fetchPosts={fetchPosts} />
        {posts.map((post) => {
          return (
            <Post
              fetchPosts={fetchPosts}
              desc={post.desc}
              date={post.createdAt}
              key={post._id}
              postId={post._id}
              userName={post.userId ? post.userId.fullName : "John Doe"}
              comments={post.comments}
              images={post.images}
              likes={post.likes}
              dislikes={post.dislikes}
            />
          );
        })}
      </div>
    </div>
  );
}
