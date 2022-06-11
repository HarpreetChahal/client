/*!
* @file      Rightbar.jsx
* @author    Dharmik Dholariya and Harpreet Singh 
* @date      02-06-2022
* @brief     This is the rightbar component page for LookMeUp project.
*/


import React from "react";
import "./rightbar.css";
import {Add, PersonAdd} from "@mui/icons-material";
import { Edit, Logout,Search } from "@mui/icons-material";


export default function Rightbar({ profile }) {
    const ProfileRightbar = () => {
        return (
            <>
           <div className="AddSearch" >
            <button className="rightbarFollowButton">
             Add Friend <PersonAdd sx={{ml:1}}/>
            </button>
            <div className="Search">
            <input type="text" placeholder="#Search"/>
            <div className="s-icon">
              <Search/>
            </div>
            </div>
            </div>
            <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="assets/person/1.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jay Saul</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/2.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jason Smith</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/3.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Tony Stark</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/4.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Allison Ray</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/5.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Harpreet Singh</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/6.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jessie Pink</span>
          </div>
        </div>

            </>
        )
    }


    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                <ProfileRightbar />
            </div>

        </div>
    )
}