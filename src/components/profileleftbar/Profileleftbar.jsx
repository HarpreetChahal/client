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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Context } from "../context/Context";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import commonApi from "../../api/common";
import { useLocation, useNavigate } from "react-router-dom";
export default function Profileleftbar({
  post,
  handleLogout,
  fetchPosts,
  fetchFriends,
  show,
}) {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("userId");
  const { user, dispatch } = useContext(Context);
  const [userData, setUserData] = useState(user);
  const [loggedInUser, setLoggedInUser] = useState(true);
  const navigate=useNavigate()
  const handleFriends = (id) => {
    if (id !== user._id) {
      navigate("/userProfile?userId=" + id);
    } else {
      navigate("/profile");
    }
  };
  const getUserData = (id) => {
    commonApi({
      action: "getUser",
      parameters: [id],
      config: {
        authToken: true,
      },
    }).then(({ DATA }) => {
      setUserData(DATA);
      if (userData._id !== user._id) {
        setLoggedInUser(false);
      }
    });
  };

  const [followers, setFollowers] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchFollowers = async (id) => {
    await commonApi({
      action: "followers",
      data: {
        query: {
          _id: id,
        },
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
    getUserData(name ? name : user._id);

    if (userData) {
      fetchFollowers(userData._id);
    }
  }, [
    userData._id,
    user.profilePicture,
    name,
    user.firstName,
    user.lastName,
    user.dob,
    user.followers,
    user.following,
  ]);
  const ProfileProfileleftbar = ({ fetchFriends }) => {
    const unFollowFriend = async (id) => {
      await commonApi({
        action: "unFollowFriend",
        data: {
          followingId: id,
        },
        config: {
          authToken: true,
        },
      }).then(async ({ DATA = {} }) => {
        fetchFriends(name ? name : user._id);
        await commonApi({
          action: "getUser",
          parameters: [user._id],
          config: {
            authToken: true,
          },
        }).then(({ DATA = {} }) => {
          dispatch({ type: "UPDATE_USER", payload: DATA });
        });
      });
    };
    const followFriend = async (id) => {
      await commonApi({
        action: "followFriend",
        data: {
          followingId: id,
        },
        config: {
          authToken: true,
        },
      }).then(async ({ DATA = {} }) => {
        fetchFriends(name ? name : user._id);
        await commonApi({
          action: "getUser",
          parameters: [user._id],
          config: {
            authToken: true,
          },
        }).then(({ DATA = {} }) => {
          dispatch({ type: "UPDATE_USER", payload: DATA });
        });
      });
    };
    const formik = useFormik({
      initialValues: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        dob: moment(userData.dob).format("yyyy-MM-DD"),
        accountType:userData.accountType ||"public"
      },
      validationSchema: Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        dob: Yup.string().required("Required"),
      }),
      onSubmit: async (values) => {
        await commonApi({
          action: "updateUser",
          parameters: user._id,
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
            <img
              src={userData.profilePicture || "assets/person/1.jpg"}
              alt=""
            />
          </div>
          <div className="ProfileName">
            <span>{userData.fullName}</span>
          </div>
          <div className="followStatus">
            <hr />
            <div>
              <div className="follow">
                <span>{userData.followers.length || 0}</span>
                <span>Followers</span>
              </div>
              <div className="vline"></div>
              <div className="follow">
                <span>{post}</span>
                <span>Posts</span>
              </div>
              <div className="vline"></div>
              <div className="follow">
                <span>{userData.following.length || 0}</span>
                <span>Following</span>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="InfoCard">
          <div className="infoHead">
            <h3>User Information </h3>
            {user._id === userData._id && (
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
                    <FormControl>
                      <FormLabel
                        id="demo-row-radio-buttons-group-label"
                        sx={{ mt: 1 }}
                      >
                        Account Type
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="accountType"
                        onChange={formik.handleChange}
                        value={formik.values.accountType}
                      >
                        <FormControlLabel
                          size="small"
                          value="public"
                          control={<Radio />}
                          label="Public"
                        />
                        <FormControlLabel
                          size="small"
                          value="private"
                          control={<Radio />}
                          label="Private"
                        />
                      </RadioGroup>
                    </FormControl>
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
            )}
          </div>

          <div className="info">
            <span>
              <b>FirstName : </b>
            </span>
            <span>{loggedInUser ? user.firstName : userData.firstName}</span>
          </div>
          <div className="info">
            <span>
              <b>LastName : </b>
            </span>
            <span>{loggedInUser ? user.lastName : userData.lastName}</span>
          </div>
          <div className="info">
            <span>
              <b>Email : </b>
            </span>
            <span>{loggedInUser ? user.email : userData.email}</span>
          </div>

          <div className="info">
            <span>
              <b>Date of birth : </b>
            </span>
            <span>
              {loggedInUser
                ? moment(user.dob).format("DD MMM,yyyy")
                : moment(userData.dob).format("DD MMM,yyyy")}
            </span>
          </div>

          {loggedInUser && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
              <Logout sx={{ ml: 1 }} />
            </button>
          )}
        </div>

         
          <div className="FollowersCard">
            {show && <h3>Who is following you</h3>}
            {!show && <h3>Followers</h3>}
            {followers.map((follower) => {
              return (
                <div className="follower" key={follower._id}>
                  <div onClick={() => {
                  handleFriends(follower._id);
                }}
                style={{"cursor":"pointer"}}
               >
                    <img
                      src={follower.profilePicture || "assets/person/1.jpg"}
                      alt=""
                      className="followerImg"
                    />
                    <div className="name">
                      <span>{follower.fullName}</span>
                    </div>
                  </div>

                  {!user.following.includes(follower._id) &&
                    user._id !== follower._id && (
                      <button
                        className="follow-button"
                        onClick={() => {
                          followFriend(follower._id);
                        }}
                      >
                        Follow
                      </button>
                    )}
                  {user.following.includes(follower._id) &&
                    user._id !== follower._id && (
                      <button
                        className="unfollow-button"
                        onClick={() => {
                          unFollowFriend(follower._id);
                        }}
                      >
                        Unfollow
                      </button>
                    )}
                </div>
              );
            })}
            {followers.length === 0 && <div>No followers found</div>}
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
        <ProfileProfileleftbar fetchFriends={fetchFriends} />
      </div>
    </div>
  );
}
