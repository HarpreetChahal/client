import React from "react";
import "./profileleftbar.css"
import { Edit, Logout } from "@mui/icons-material";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



export default function Profileleftbar({ profile }) {

    const [value, setValue] = React.useState(null);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const ProfileProfileleftbar = () => {
        return (
            <>
                <div className="ProfileCardData">
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
                <div className="InfoCard">
                    <div className="infoHead">
                        <h3>User Information </h3>
                        <div>
                            <Edit onClick={handleClickOpen} />

                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle >Update user information</DialogTitle>
                                <DialogContent>
                                    {/* <DialogContentText>
            User Information
          </DialogContentText> */}
                                    <TextField id="outlined-basic" label="First Name" variant="outlined" sx={{ mt: 1, width: "48%" }} />
                                    <TextField id="outlined-basic" label="Last Name" variant="outlined" sx={{ mt: 1, ml: 2.6, width: "48%" }} />
                                    <TextField id="outlined-basic" label="Email" type="email" variant="outlined" sx={{ mt: 2, width: "100%" }} />
                                    <TextField id="outlined-basic" label="Date of Birth" type="date" defaultValue="1990-01-01" variant="outlined" sx={{ mt: 2, width: "100%" }} />
                                </DialogContent>
                                <DialogActions>
                                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                                    <Button variant="contained" onClick={handleClose}>Update</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>

                    <div className="info">
                        <span>
                            <b>Username : </b>
                        </span>
                        <span>John Doe</span>

                    </div>

                    <div className="info">
                        <span>
                            <b>Email : </b>
                        </span>
                        <span>johndoe@gmail.com</span>

                    </div>

                    <div className="info">
                        <span>
                            <b>Date of birth : </b>
                        </span>
                        <span>01-01-1990</span>

                    </div>


                    <button className="logout-button">Logout
                        <Logout sx={{ ml: 1 }} />
                    </button>


                </div>

                <div className="FollowersCard">
                    <h3>Who is following you</h3>
                    <div className="follower">
                        <div>
                            <img src="assets/person/1.jpg" alt="" className="followerImg" />
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
                            <img src="assets/person/2.jpg" alt="" className="followerImg" />
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
                            <img src="assets/person/3.jpg" alt="" className="followerImg" />
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
                            <img src="assets/person/4.jpg" alt="" className="followerImg" />
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