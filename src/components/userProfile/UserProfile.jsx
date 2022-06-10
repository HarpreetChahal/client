import React, { useContext, useState, useEffect } from "react";

import Topbar from "../topbar/Topbar";
import Leftbar from "../leftbar/Leftbar";
import Feed from "../feed/Feed";
import Profileleftbar from "../profileleftbar/Profileleftbar";
import Rightbar from "../rightbar/Rightbar";
import "./profile.css";
import { Context } from "../context/Context";
import commonApi from "../../api/common";
import { useLocation } from "react-router-dom";
export default function UserProfile() {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("userId");
const [user,setUser]=useState()
  const userData=()=>{ commonApi({ action: "getUser", parameters: [name],  config: {
    authToken: true,
  }, }).then( ({DATA})=>{
    setUser(DATA)
  
  })}
  

  const [posts, setPosts] = useState([]);

  const fetchPosts = async (query = {}) => {
    let data = {
      query: query,
      options: {
        pagination: false,
        populate: [
          {
            path: "userId",
            model: "user",
            select: ["_id", "fullName", "profilePicture"],
          },
          {
            path: "comments.userId",
            model: "user",
            select: ["_id", "fullName", "profilePicture"],
          },
        ],
        sort: { createdAt: -1 },
      },
    };
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
    userData()
    if(user)
    {  
     fetchPosts({ userId: user._id });

    }
    
  }, []);

  return (
    <>
      <Topbar fetchPosts={fetchPosts} />
      <div className="profile">
        {/* <Leftbar /> */}
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src="assets/post/3.jpg" alt="" />

              <img
                className="profileUserImg"
                src={user?.profilePicture || "assets/person/1.jpg"}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.fullName}</h4>
              {/* <span className="profileInfoDesc">It's a good day..!</span> */}
            </div>
          </div>
          <div className="profileRightBottom">
            <Profileleftbar post={posts.length || 0} fetchPosts={fetchPosts} />
            <Feed
              posts={posts}
              fetchPosts={() => fetchPosts({ userId: user?._id })}
            />
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
}
