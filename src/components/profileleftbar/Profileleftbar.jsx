import React, { useContext } from "react";
import "./profileleftbar.css"
import { Edit, Logout } from "@mui/icons-material";
import { Context } from "../context/Context";
import moment from "moment"

export default function Profileleftbar() {
    const {user}=useContext(Context)
    const ProfileProfileleftbar = () => {
        return (
            <>
            <div className="InfoCard">
                <div className="infoHead">
                    <h3>User Information </h3>
                    <div>
                    <Edit/>
                    </div>
                </div>

            <div className="info">
                <span>
                    <b>Username : </b>
                </span>
                <span>{user.fullName}</span>

            </div>

            <div className="info">
                <span>
                    <b>Email : </b>
                </span>
                <span>{user.email}</span>

            </div>

            <div className="info">
                <span>
                    <b>Date of birth : </b>
                </span>
                <span>{moment(user.dob).format("DD MMM,yyyy")}</span>

            </div>


            <button className="logout-button">Logout
            <Logout sx={{ml:1}}/>
            </button>
            

            </div>

            <div className="FollowersCard">
                <h3>Who is following you</h3>
                <div className="follower">
                    <div>
                        <img src="assets/person/1.jpg" alt="" className="followerImg"/>
                        <div className="name">
                            <span>
                                John Doe
                            </span>
                        </div>
                    </div>

                    <button className="follow-button">Follow</button>


                </div>
                <div className="follower">
                    <div>
                        <img src="assets/person/1.jpg" alt="" className="followerImg"/>
                        <div className="name">
                            <span>
                                Jaden Smith
                            </span>
                        </div>
                    </div>

                    <button className="follow-button">Follow</button>


                </div>
                <div className="follower">
                    <div>
                        <img src="assets/person/1.jpg" alt="" className="followerImg"/>
                        <div className="name">
                            <span>
                                Manny Moe
                            </span>
                        </div>
                    </div>

                    <button className="follow-button">Follow</button>


                </div>
                <div className="follower">
                    <div>
                        <img src="assets/person/1.jpg" alt="" className="followerImg"/>
                        <div className="name">
                            <span>
                                Twin Turbo
                            </span>
                        </div>
                    </div>

                    <button className="follow-button">Follow</button>


                </div>
            </div>




            {/* <h4 className="rightbarTitle"> User Information </h4>
            
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
                <ProfileProfileleftbar />
            </div>

        </div>
    )
}