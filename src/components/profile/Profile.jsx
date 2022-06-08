import React, { useContext, useState,useEffect } from "react";

import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Profileleftbar from "../profileleftbar/Profileleftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
import { Context } from "../context/Context";
import commonApi from "../../api/common";

export default function Profile() {
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const fetchPosts = async (query={}) => {
      console.log("query",query)
      let data={
          query:query,
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
      }
    await commonApi({
      action: "fetchPost",
      data: data,
      config: {
        authToken: true,
      },
    }).then(({ DATA }) => {
      setPosts(DATA.data);
    });
  };

  useEffect(() => {
      fetchPosts();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        {/* <Leftbar /> */}
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src="assets/post/3.jpg" alt="" />
              <img
                className="profileUserImg"
                src="assets/person/1.jpg"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.fullName}</h4>
              {/* <span className="profileInfoDesc">It's a good day..!</span> */}
            </div>
          </div>
          <div className="profileRightBottom">
            <Profileleftbar fetchPosts={()=>fetchPosts}/>
            <Feed posts={posts} fetchPosts={()=>fetchPosts({userId:user._id})} />
            <Rightbar  />
          </div>
        </div>
      </div>
    </>
  );
}
