import React, { useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import commonApi from "../../api/common";
import Toast from "../../api/toast";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const fetchPosts = React.useCallback(async () => {
    await commonApi({
      action: "fetchPost",
      data: {
        options: {
            pagination:false,
          populate: [
            { path: "userId", model: "user", select: ["_id", "fullName"] },
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
  });
  useEffect(() => {
  
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share fetchPosts={fetchPosts}/>
        {posts.map((post) => {
          return (
            <Post
              desc={post.desc}
              date={post.createdAt}
              key={post._id}
              userName={post.userId.fullName}
            />
          );
        })}
      </div>
    </div>
  );
}
