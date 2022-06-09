import React from "react";
import "./homerightbar.css";


export default function Homerightbar() {
    return (
        <div className="rightbar">
            <div className="homerightbarWrapper">
                <div className="ProfileCard">
                    <div className="ProfileImages">
                        <img src="assets/cover/1.jpg" alt="" />
                        <img src="assets/person/1.jpg" alt="" />
                    </div>
                    <div className="ProfileName">
                        <span>John Doe</span>
                    </div>
                    <div className="followStatus">
                        <hr />
                        <div>
                            <div className="follow">
                                <span>10</span>
                                <span>Followers</span>
                            </div>
                            <div className="vline"></div>
                            <div className="follow">
                                <span>5</span>
                                <span>Posts</span>
                            </div>
                            <div className="vline"></div>
                            <div className="follow">
                                <span>12</span>
                                <span>Following</span>
                            </div>

                        </div>
                        <hr />

                    </div>


                </div>

            </div>

        </div>
    )
}