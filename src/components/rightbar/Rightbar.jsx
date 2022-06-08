/*!
* @file      Rightbar.jsx
* @author    Dharmik Dholariya and Harpreet Singh 
* @date      02-06-2022
* @brief     This is the rightbar component page for LookMeUp project.
*/


import React from "react";
import "./rightbar.css";
import {Add} from "@mui/icons-material";


export default function Rightbar({ profile }) {
    const ProfileRightbar = () => {
        return (
            <>
            <button className="rightbarFollowButton">
             Follow <Add/>
            </button>
            <h4 className="rightbarTitle">User friends</h4>
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
            <span className="rightbarFollowingName">Carter King</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/6.jpg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">Jessie Pin</span>
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