/*!
 * @file      Rightbar.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the rightbar component page for LookMeUp project.
 */

import React, { useState,useEffect } from "react";
import "./rightbar.css";
import { Add, PersonAdd } from "@mui/icons-material";
import { Edit, Logout } from "@mui/icons-material";
import commonApi from "../../api/common";

export default function Rightbar({ profile }) {
  const [friends, setFriends] = useState([]);
  const fetchFriends = async () => {
    await commonApi({
      action: "friends",
      data: {
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
  useEffect(()=>{
    fetchFriends()
  },[])
  const ProfileRightbar = () => {
    return (
      <>
        <button className="rightbarFollowButton">
          Follow <PersonAdd sx={{ ml: 1 }} />
        </button>

        <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => {
            return (
              <div className="rightbarFollowing">
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
