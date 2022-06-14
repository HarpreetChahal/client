/*!
 * @file      Home.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the home page for LookMeUp project.
 */

import React, { useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/HomeLeftBar/homeLeftBar"
import Feed from "../../components/feed/Feed";
import Loader from "../../components/Loader";
import Homerightbar from "../../components/homerightbar/Homerightbar";
// import Rightbar from "../../components/rightbar/Rightbar";
// import Profile from "../../components/profile/Profile";
import "./home.css";
import commonApi from "../../api/common";
export default function Home({ handleLogout }) {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const hideLoader = () => {
    setLoader(false);
  };
  const showLoader = () => {
    setLoader(true);
  };
  const fetchPosts = async (query = {}) => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      query.showPosts=true
    await commonApi({
      action: "fetchPost",
      data: {
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
      },
      config: {
        authToken: true,
      },
    }).then(({ DATA }) => {
      setPosts(DATA.data);
    });
  }
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Topbar fetchPosts={fetchPosts} handleLogout={handleLogout} />
          <div className="homeContainer">
            <Leftbar fetchPosts={fetchPosts} handleLogout={handleLogout} />
            <Feed fetchPosts={fetchPosts} posts={posts} />
            {/* <Rightbar/>    */}

            <Homerightbar fetchPosts={fetchPosts}/>
          </div>
        </>
      )}
    </>
  );
}
