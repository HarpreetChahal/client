import React from "react";
import "./homerightbar.css";


export default function Homerightbar() {
    return (
        <div className="rightbar">
            <div className="homerightbarWrapper">

            <div className="SuggestionsCard">
                <h3>Suggestions</h3>
                <h5>Add Friends</h5>
                <div className="follower">
                    <div>
                        <img src="assets/person/1.jpg" alt="" className="followerImg"/>
                        <div className="username">
                            <span>
                                John Doe
                            </span>
                        </div>
                    </div>

                    <button className="add-friend-button">Follow</button>


                </div>
                <div className="follower">
                    <div>
                        <img src="assets/person/2.jpg" alt="" className="followerImg"/>
                        <div className="username">
                            <span>
                                Jaden Smith
                            </span>
                        </div>
                    </div>

                    <button className="add-friend-button">Follow</button>


                </div>
                <div className="follower">
                    <div>
                        <img src="assets/person/3.jpg" alt="" className="followerImg"/>
                        <div className="username">
                            <span>
                                Manny Moe
                            </span>
                        </div>
                    </div>

                    <button className="add-friend-button">Follow</button>


                </div>
                <div className="follower">
                    <div>
                        <img src="assets/person/4.jpg" alt="" className="followerImg"/>
                        <div className="username">
                            <span>
                                Twin Turbo
                            </span>
                        </div>
                    </div>

                    <button className="add-friend-button">Follow</button>
                    


                </div>
                <div className="follower">
                    <div>
                        <img src="assets/person/2.jpg" alt="" className="followerImg"/>
                        <div className="username">
                            <span>
                                Gin Roll
                            </span>
                        </div>
                    </div>

                    <button className="add-friend-button">Follow</button>
                    


                </div><div className="follower">
                    <div>
                        <img src="assets/person/1.jpg" alt="" className="followerImg"/>
                        <div className="username">
                            <span>
                                Don Tide
                            </span>
                        </div>
                    </div>

                    <button className="add-friend-button">Follow</button>
                    


                </div><div className="follower">
                    <div>
                        <img src="assets/person/6.jpg" alt="" className="followerImg"/>
                        <div className="username">
                            <span>
                                Tur Bon
                            </span>
                        </div>
                    </div>

                    <button className="add-friend-button">Follow</button>
                    


                </div><div className="follower">
                    <div>
                        <img src="assets/person/5.jpg" alt="" className="followerImg"/>
                        <div className="username">
                            <span>
                                James May
                            </span>
                        </div>
                    </div>

                    <button className="add-friend-button">Follow</button>
                    


                </div>
            </div>


            </div>

        </div>
    )
}