import React, { useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./feed.css";
import commonApi from "../../api/common";

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
            {
              path:"comments.userId",model:"user",select:["_id","fullName"]
            }
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
              postId={post._id}
              userName={post.userId ?post.userId.fullName : "John Doe"}
              comments={post.comments}
              images={post.images}
            />
          );
        })}
      </div>
    </div>
  );
}
