import React, { useEffect, useState, useContext } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import commonApi from "../../api/common";
import { Context } from "../context/Context";
export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(Context);
  const fetchPosts = async () => {
    await commonApi({
      action: "fetchPost",
      data: {
        options: {
          pagination: false,
          populate: [
            { path: "userId", model: "user", select: ["_id", "fullName"] },
            {
              path: "comments.userId",
              model: "user",
              select: ["_id", "fullName"],
            },
          ],
          sort: { createdAt: -1 },
        },
      },
      config: {
        authToken: true,
      },
    }).then(({ DATA }) => {
      setPosts(DATA.data);
    });
  };
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
