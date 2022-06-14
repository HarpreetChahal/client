import React, { useContext, useState, useEffect } from "react";

import Topbar from "../topbar/Topbar";

import Feed from "../feed/Feed";
import Profileleftbar from "../profileleftbar/Profileleftbar";
import ProfileRightbar from "../ProfileRightBar/ProfileRightbar";
import "./UserProfile.css";
import { Context } from "../context/Context";
import commonApi from "../../api/common";
import { useLocation } from "react-router-dom";
export default function UserProfile({handleLogout}) {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("userId");
  const [user, setUser] = useState();
  const [friends, setFriends] = useState([]);
  const {dispatch}=useContext(Context)
  const fetchFriends = async (id,searchValue="") => {
    await commonApi({
      action: "friends",
      data: {
        query: {
          _id: id,
          searchValue:searchValue
        },
        options: {
          pagination: false,
          sort: { createdAt: -1 }
        }
      },
      config: {
        authToken: true
      }
    }).then(({ DATA = {} }) => {
      setFriends(DATA.data);
    });
  };
  const userData = () => {
    commonApi({
      action: "getUser",
      parameters: [name],
      config: {
        authToken: true
      }
    }).then(({ DATA }) => {
      setUser(DATA);
    });
  };

  const [posts, setPosts] = useState([]);

  const fetchPosts = async (query = {},search="") => {
    if(search)
    {
      query.desc={
        $regex:search,
        $options:"i"
      }
    }
    if(user?._id)
   { 
    query.userId=user._id
    let data = {
      query: query,
      options: {
        pagination: false,
        populate: [
          {
            path: "userId",
            model: "user",
            select: ["_id", "fullName", "profilePicture"]
          },
          {
            path: "comments.userId",
            model: "user",
            select: ["_id", "fullName", "profilePicture"]
          }
        ],
        sort: { createdAt: -1 }
      }
    };
    await commonApi({
      action: "fetchPost",
      data: data,
      config: {
        authToken: true
      }
    }).then(({ DATA }) => {
      setPosts(DATA.data);
    });}
  };


  useEffect(() => {
    userData();
    if (user) {
      fetchPosts({ userId: user._id });
    }
  }, [user?._id]);

  return (
    <>
       <Topbar fetchPosts={fetchPosts} handleLogout={handleLogout} />
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
            <Profileleftbar post={posts.length || 0} fetchPosts={fetchPosts} fetchFriends={fetchFriends} show={false}/>
            <Feed posts={posts} fetchPosts={fetchPosts} />
            <ProfileRightbar friends={friends} fetchFriends={fetchFriends} userDetails={user} userData={userData} show={true}/>
          </div>
        </div>
      </div>
    </>
  );
}
