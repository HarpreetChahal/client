import React, { useContext, useState, useEffect } from "react";
import "./profileleftbar.css";
import { Edit, Logout } from "@mui/icons-material";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Context } from "../context/Context";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import commonApi from "../../api/common";
export default function Profileleftbar({ post, handleLogout, fetchPosts }) {
  const { user, dispatch } = useContext(Context);
  const [followers, setFollowers] = useState([]);
  const [value, setValue] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchFollowers = async () => {
    await commonApi({
      action: "followers",
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
      setFollowers(DATA.data);
    });
  };
  useEffect(() => {
    fetchFollowers();
  }, []);

  const ProfileProfileleftbar = () => {
    const formik = useFormik({
      initialValues: {
        firstName: user.firstName,
        lastName: user.lastName,
        dob: moment(user.dob).format("yyyy-MM-DD"),
      },
      validationSchema: Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        dob: Yup.string().required("Required"),
      }),
      onSubmit: async (values) => {
        await commonApi({
          action: "updateUser",
          parameters: user._id ? [user._id] : [],
          data: values,
        })
          .then(({ DATA = {} }) => {
            dispatch({ type: "UPDATE_USER", payload: DATA });
            fetchPosts({ userId: user._id });
            handleClose();
            //   Toast.success(MESSAGE);
          })
          .catch((error) => {
            console.error(error);
          });
      },
    });
    return (
      <>
        <div className="ProfileCardData">
          <div className="ProfileImages">
            <img src="assets/cover/1.jpg" alt="" />
            <img src={user.profilePicture || "assets/person/1.jpg"} alt="" />
          </div>
          <div className="ProfileName">
            <span>{user.fullName}</span>
          </div>
          <div className="followStatus">
            <hr />
            <div>
              <div className="follow">
                <span>{user.followers.length || 0}</span>
                <span>Followers</span>
              </div>
              <div className="vline"></div>
              <div className="follow">
                <span>{post}</span>
                <span>Posts</span>
              </div>
              <div className="vline"></div>
              <div className="follow">
                <span>{user.following.length || 0}</span>
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
                <DialogTitle>Update user information</DialogTitle>
                <DialogContent>
                  {/* <DialogContentText>
            User Information
          </DialogContentText> */}
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    sx={{ mt: 1, width: "48%" }}
                    //error={(formik.touched.firstName && formik.errors.firstName)}
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    sx={{ mt: 1, ml: 2.6, width: "48%" }}
                    //error={(formik.touched.lastName && formik.errors.lastName)}
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    sx={{ mt: 2, width: "100%" }}
                    value={user.email}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    defaultValue="1990-01-01"
                    variant="outlined"
                    sx={{ mt: 2, width: "100%" }}
                    //  error={(formik.touched.dob && formik.errors.dob)}
                    onChange={formik.handleChange}
                    value={formik.values.dob}
                  />
                </DialogContent>
                <DialogActions>
                  <Button variant="contained" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    disabled={!(formik.isValid && formik.dirty)}
                    onClick={formik.handleSubmit}
                  >
                    Update
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>

          <div className="info">
            <span>
              <b>FirstName : </b>
            </span>
            <span>{user.firstName}</span>
          </div>
          <div className="info">
            <span>
              <b>LastName : </b>
            </span>
            <span>{user.lastName}</span>
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

          <button className="logout-button" onClick={handleLogout}>
            Logout
            <Logout sx={{ ml: 1 }} />
          </button>
        </div>

        <div className="FollowersCard">
          <h3>Who is following you</h3>
          {followers.map((follower)=>{
            return (
              <div className="follower">
            <div>
              <img src="assets/person/1.jpg" alt="" className="followerImg" />
              <div className="name">
                <span>{follower.fullName}</span>
              </div>
            </div>

            <button className="follow-button">Follow</button>
          </div>
            )
          })}
          
     
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
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <ProfileProfileleftbar />
      </div>
    </div>
  );
}
