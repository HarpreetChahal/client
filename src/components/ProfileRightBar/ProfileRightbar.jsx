/*!
 * @file      Rightbar.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the rightbar component page for LookMeUp project.
 */

import React, { useState, useEffect, useContext } from "react";
import "./ProfileRightBar.css";
import {
  Add,
  PersonAdd,
  Search,
  People,
  PersonRemove,
} from "@mui/icons-material";
import { Edit, Logout } from "@mui/icons-material";
import commonApi from "../../api/common";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Context } from "../context/Context";

export default function ProfileRightbar({
  friends,
  fetchFriends,
  fetchPosts,
  userDetails,
  userData,
  show,
}) {
  const search = useLocation().search;
  const [searchValue, setSearchValue] = useState("");
  const name = new URLSearchParams(search).get("userId");
  const { user, dispatch } = useContext(Context);
  if (!name) {
    userDetails = user;
  }

  // const [loggedInUser, setLoggedInUser] = useState(user._id!==name)

  useEffect(() => {
    if (name) {
      fetchFriends(name,searchValue);
    } else {
      fetchFriends(userDetails._id,searchValue);
    }
    userData();
  }, [name, userDetails?._id,searchValue,user.following,user.followers]);

  const navigate = useNavigate();
  const handleFriends = (id) => {
    if (id !== user._id) {
      navigate("/userProfile?userId=" + id);
    } else {
      navigate("/profile");
    }
  };
  const unFollowFriend = async (id) => {
    await commonApi({
      action: "unFollowFriend",
      data: {
        followingId: id,
      },
      config: {
        authToken: true,
      },
    }).then(async ({ DATA = {} }) => {
      
      fetchFriends(name ? name : user._id,searchValue);
      await commonApi({
        action: "getUser",
        parameters: [user._id],
        config: {
          authToken: true,
        },
      }).then(({ DATA = {} }) => {
        dispatch({ type: "UPDATE_USER", payload: DATA });
        fetchPosts({ userId: name });
      });
    });
  };
  const followFriend = async (id) => {
    await commonApi({
      action: "followFriend",
      data: {
        followingId: id,
      },
      config: {
        authToken: true,
      },
    }).then(async ({ DATA = {} }) => {
      fetchFriends(name ? name : user._id);
      await commonApi({
        action: "getUser",
        parameters: [user._id],
        config: {
          authToken: true,
        },
      }).then(({ DATA = {} }) => {
        dispatch({ type: "UPDATE_USER", payload: DATA });
        fetchPosts({ userId: name });
      });
    });
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
      <div className="AddSearch">
          {show && !user.following.includes(userDetails?._id) && (
            <button
              className="rightbarFollowButton"
              onClick={() => {
                followFriend(name);
              }}
            >
              Follow <PersonAdd sx={{ ml: 1 }} />
            </button>
          )}
          {show && user.following.includes(userDetails?._id) && (
            <button
              className="rightbarFollowButton"
              onClick={() => {
                unFollowFriend(name);
              }}
            >
              Unfollow <PersonRemove sx={{ ml: 1 }} />
            </button>
          )}
          <div className="Search">
            <input
              type="text"
              placeholder="# Search friends"
              value={searchValue}
               onChange={(e)=>{
                setSearchValue(e.target.value)
              }}
            />
            <div className="s-icon">
              <Search />
            </div>
          </div>
        </div>
        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            return (
              <div
                className="rightbarFollowing"
                onClick={() => {
                  handleFriends(friend._id);
                }}
                style={{cursor:"pointer"}}
                key={friend._id}
              >
                <img
                  src={friend.profilePicture || "assets/person/1.jpg"}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.fullName}</span>
              </div>
            );
          })}

          {friends.length === 0 && (
            <div className="no-friends-found">
              {/* <div className="no-post-icon"> */}
              <People fontSize="medium" sx={{ mt: 4, mb: 0 }} />
              {/* </div> */}
              <p className="no-friends-text">No Friends Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}