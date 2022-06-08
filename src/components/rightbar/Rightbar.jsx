/*!
* @file      Rightbar.jsx
* @author    Dharmik Dholariya and Harpreet Singh 
* @date      02-06-2022
* @brief     This is the rightbar component page for LookMeUp project.
*/


import React from "react";
import "./rightbar.css"


export default function Rightbar({ profile }) {
    const ProfileRightbar = () => {
        return (
            <>
            {/* <h4 className="rightbarTitle"> User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Lives in:</span>
                    <span className="rightbarInfoValue">New York</span>
                </div>

                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">Amsterdam</span>
                </div>

                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">Single</span>
                </div>

                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Occupation:</span>
                    <span className="rightbarInfoValue">Banker</span>
                </div>

            </div> */}
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