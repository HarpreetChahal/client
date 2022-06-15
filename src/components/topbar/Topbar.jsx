/*!
 * @file      Topbar.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the topbar component page (navigation bar) for LookMeUp project.
 */
import React from "react";
import "./topbar.css";
import { useContext, useState, useEffect } from "react";
import { AccountBox, Home, Search, Feed, Close } from "@mui/icons-material";
import { Context } from "../../components/context/Context";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function Topbar({ fetchPosts, handleLogout }) {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const pathName = location.pathname;
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const search = useLocation()?.search;
  const userId = new URLSearchParams(search)?.get("userId");

  useEffect(() => {
    if (userId) {
      setSearchValue("");
    }
  }, [userId]);

  useEffect(() => {
    if (pathName === "/profile") {
      fetchPosts({}, searchValue);
    } else if (pathName === "/") {
      fetchPosts({
        desc: {
          $regex: searchValue,
          $options: "i",
        },
      });
    } else {
      fetchPosts({}, searchValue);
    }
  }, [searchValue]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span
          className="logo"
          onClick={() => {
            fetchPosts();
            navigate("/");
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          LookMeUp
        </span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for posts"
            className="searchInput"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          {searchValue !== "" && (
            <Close
            style={{cursor:"pointer"}}
              onClick={() => {
                setSearchValue("");
              }}
            />
          )}
        </div>
      </div>

      <div className="topbarRight">
        <Home
          className="home_button"
          fontSize="medium"
          onClick={() => {
            fetchPosts();
            navigate("/");
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
        <span
          className="home_text"
          onClick={() => {
            fetchPosts();
            navigate("/");
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          Home
        </span>
        {pathName !== "/profile" && 
          <Feed
            className="timeline_button"
            fontSize="medium"
            onClick={() => {
              navigate("/profile");
            }}
          />}
        
        {pathName !== "/profile" &&   <span
          className="timeline_text"
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </span>}
        <Logout
          className="logout_button"
          fontSize="medium"
          onClick={handleLogout}
        />
        <span className="logout_text" onClick={handleLogout}>
          Logout
        </span>

        {/* <span className="helloUser">Hi, {user.firstName}</span> */}
        <div>
          <img
            src={user?.profilePicture || "/assets/person/1.jpg"}
            alt=""
            className="topbarImg"
            onClick={() => {
              navigate("/profile");
            }}
          />
        </div>

        {/* <div className="logout">
                    <Button variant="contained" color="success" endIcon={<UploadFile />}>
                       Logout
                    </Button>
                    </div> */}
        {/* <div className="logoutButton">
                    <Logout  sx={{ 
                        color: "#1877f2", 
                        backgroundColor: "#fefeff",
                        borderRadius: "8px",
                         }}/>
                    </div> */}
      </div>
    </div>
  );
}
