/*!
 * @file      Rightbar.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the rightbar component page for LookMeUp project.
 */

import React, { useState, useEffect,useContext } from "react";
import "./rightbar.css";
import { Add, PersonAdd } from "@mui/icons-material";
import { Edit, Logout } from "@mui/icons-material";
import commonApi from "../../api/common";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {Context} from "../context/Context"

export default function Rightbar({}) {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("userId");
  const {user}= useContext(Context)
  const [friends, setFriends] = useState([]);
  // const [loggedInUser, setLoggedInUser] = useState(user._id!==name)
  const fetchFriends = async (id) => {
    await commonApi({
      action: "friends",
      data: {
        query: {
          _id: id,
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
  useEffect(() => {
    if(name)
    {
      fetchFriends(name);
    }
    else
    {
      fetchFriends(user._id);
    }
   
  }, []);
  const ProfileRightbar = () => {
    const navigate = useNavigate();
    const handleFriends = (id) => {
      if(id!==user._id)
      {
        navigate("/userProfile?userId=" + id);
      }
      else
      {
        navigate("/profile");
      }
    };

    return (
      <>
        {/* {((name && user._id!==name && !user.following.includes(name))) &&<button className="rightbarFollowButton">
          Follow <PersonAdd sx={{ ml: 1 }} />
        </button>} */}

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
