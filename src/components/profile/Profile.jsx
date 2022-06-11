import React, { useContext, useState, useEffect } from "react";

import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Profileleftbar from "../profileleftbar/Profileleftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";
import { Context } from "../context/Context";
import commonApi from "../../api/common";

export default function Profile({ handleLogout }) {
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const fetchFriends = async (id) => {
    await commonApi({
      action: "friends",
      data: {
        query: {
          _id: id
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
  const fetchPosts = async (query = {}) => {
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
    });
  };

  const uploadImage = async () => {
    const fileData = new FormData();
    const fileName = Date.now() + file.name;
    fileData.append("name", fileName);
    fileData.append("file", file);
    await commonApi({
      action: "upload",
      data: fileData
    });
    let pp = "http://localhost:5000/assets/" + fileName;

    await commonApi({
      action: "updateUser",
      parameters: user._id ? [user._id] : [],
      data: {
        profilePicture: pp
      },
      config: {
        authToken: true
      }
    }).then(({ DATA = {} }) => {
      dispatch({ type: "UPDATE_USER", payload: DATA });
    });
  };
  const unFollowFriend = async (id) => {
    await commonApi({
      action: "unFollowFriend",
      data: {
        followingId: id
      },
      config: {
        authToken: true
      }
    }).then(async ({ DATA = {} }) => {
      fetchFriends(user._id)
      await commonApi({
        action: "getUser",
        parameters: [user._id],
        config: {
          authToken: true
        }
      }).then(({ DATA = {} }) => {
        dispatch({ type: "UPDATE_USER", payload: DATA });
      });
    });
  };
  useEffect(() => {
    fetchPosts({ userId: user._id });
    if (file) {
      uploadImage();
    }
  }, [file]);

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
                src={
                  (file && URL.createObjectURL(file)) ||
                  user.profilePicture ||
                  "assets/person/1.jpg"
                }
                alt=""
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
              unFollowFriend={unFollowFriend}
            />
            <Feed
              posts={posts}
              fetchPosts={() => fetchPosts({ userId: user._id })}
            />
            <Rightbar friends={friends} fetchFriends={fetchFriends}/>
          </div>
        </div>
      </div>
    </>
  );
}
