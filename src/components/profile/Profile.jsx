import React from "react";

import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css"


export default function Profile() {
    return (
        <>
            <Topbar />
            <div className="profile">
            <Leftbar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src="assets/post/3.jpg"
                                alt="" />
                            <img
                                className="profileUserImg"
                                src="assets/person/1.jpg"
                                alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">John Doe</h4>
                            {/* <span className="profileInfoDesc">It's a good day..!</span> */}
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        {/* <Leftbar /> */}
                        <Feed />
                        <Rightbar profile/>
                    </div>
                </div>
            </div>
        </>
    )
}