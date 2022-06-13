/*!
 * @file      Rightbar.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the rightbar component page for LookMeUp project.
 */

import React, { useState, useEffect, useContext } from "react";
import "./rightbar.css";
import { Add, PersonAdd } from "@mui/icons-material";
import { Edit, Logout } from "@mui/icons-material";
import commonApi from "../../api/common";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Context } from "../context/Context";

export default function Rightbar({
  friends,
  fetchFriends,
  userDetails,
  userData,
  show,
}) {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("userId");
  const { user, dispatch } = useContext(Context);
  if (!name) {
    userDetails = user;
  }

  // const [loggedInUser, setLoggedInUser] = useState(user._id!==name)

  useEffect(() => {
    if (name) {
      fetchFriends(name);
    } else {
      fetchFriends(userDetails._id);
    }
    userData();
  }, [name, userDetails?._id]);
  const ProfileRightbar = () => {
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
        fetchFriends(name ? name : user._id);
        await commonApi({
          action: "getUser",
          parameters: [user._id],
          config: {
            authToken: true,
          },
        }).then(({ DATA = {} }) => {
          dispatch({ type: "UPDATE_USER", payload: DATA });
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
        });
      });
    };
    return (
      <>
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
            UnFollow <PersonAdd sx={{ ml: 1 }} />
          </button>
        )}
        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            return (
              <div
                className="rightbarFollowing"
                onClick={() => {
                  handleFriends(friend._id);
                }}
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

          {friends.length === 0 && <div>No Friend Found</div>}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <ProfileRightbar />
      </div>
    </div>
  );
}
