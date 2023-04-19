import React, { useContext, useState, useEffect } from "react";

import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Profileleftbar from "../profileleftbar/Profileleftbar";
import ProfileRightbar from "../ProfileRightBar/ProfileRightbar";
import { CameraAlt } from "@mui/icons-material";
import "./profile.css";
import { Context } from "../context/Context";
import commonApi from "../../api/common";
import { imageUrl } from "../../api";
export default function Profile({ handleLogout }) {
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
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
          sort: { createdAt: -1 },
        },
      },
      config: {
        authToken: true,
      },
    }).then(({ DATA = {} }) => {
      setFriends(DATA.data);
    });
  };
  const fetchPosts = async (query = {},search="") => {
      query.desc={
        $regex:search,
        $options:"i"
    }
    query.userId=user._id
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

  const uploadImage = async () => {
    const fileData = new FormData();
    const fileName = Date.now() + file.name;
    fileData.append("name", fileName);
    fileData.append("file", file);
    await commonApi({
      action: "upload",
      data: fileData,
    });
    let pp = imageUrl+ fileName;

    await commonApi({
      action: "updateUser",
      parameters: user._id ? [user._id] : [],
      data: {
        profilePicture: pp,
      },
      config: {
        authToken: true,
      },
    }).then(({ DATA = {} }) => {
      dispatch({ type: "UPDATE_USER", payload: DATA });
    });
  };

  useEffect(() => {
    fetchPosts({userId:user._id});
    if (file) {
      uploadImage();
    }
  }, [file]);
  const userData = () => {};
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
                src={
                  (file && URL.createObjectURL(file)) ||
                  user.profilePicture ||
                  "assets/person/1.jpg"
                }
                alt=""
              />

              <CameraAlt
                fontSize="large"
                sx={{ color: "#1877f2" }}
                className="changeImg"
              />

              <input
                className="changeUserImg"
                // style={{ display: "none" }}
                style={{ opacity: 0 }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.fullName}</h4>
              {/* <span className="profileInfoDesc">It's a good day..!</span> */}
            </div>
          </div>
          <div className="profileRightBottom">
            <Profileleftbar
              post={posts.length || 0}
              handleLogout={handleLogout}
              fetchPosts={fetchPosts}
              fetchFriends={fetchFriends}
              show={true}
            />
            <Feed
              posts={posts}
              fetchPosts={() => fetchPosts({ userId: user._id })}
            />
            <ProfileRightbar
              friends={friends}
              fetchFriends={fetchFriends}
              userDetails={user}
              userData={userData}
              show={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}
