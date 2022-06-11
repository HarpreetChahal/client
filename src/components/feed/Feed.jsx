/*!
 * @file      Feed.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the feed component page (displays posts) for LookMeUp project.
 */

import React, { useEffect, useState, useContext } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import { useLocation } from "react-router-dom";
export default function Feed({ posts, fetchPosts }) {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("userId");
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      if (name) {
        fetchPosts({ userId: name });
      } else {
        fetchPosts();
      }
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
       { !name&& <Share fetchPosts={fetchPosts} />}
        {posts.map((post) => {
          return (
            <Post
              fetchPosts={fetchPosts}
              desc={post.desc}
              date={post.createdAt}
              key={post._id}
              postId={post._id}
              userData={post.userId}
              comments={post.comments}
              images={post.images}
              likes={post.likes}
              dislikes={post.dislikes}
            />
          );
        })}
        {posts.length===0 &&<div> No Post Found</div>}
      </div>
    </div>
  );
}
