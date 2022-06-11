/*!
 * @file      Topbar.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the topbar component page (navigation bar) for LookMeUp project.
 */

import "./topbar.css";
import { useContext } from "react";
import { Search } from "@mui/icons-material";
import { Context } from "../../components/context/Context";
import { useNavigate } from "react-router-dom";
export default function Topbar({ fetchPosts }) {
  const { user } = useContext(Context);
  const navigate = useNavigate();
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
              behavior: "smooth"
            });
          }}
        >
          LookMeUp
        </span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input placeholder="Search for anything" className="searchInput" />
        </div>
      </div>

      <div className="topbarRight">
        <span className="helloUser">Hello, {user.firstName}</span>
        <img
          src={user?.profilePicture || "/assets/person/1.jpg"}
          alt=""
          className="topbarImg"
          onClick={() => {
            navigate("/profile");
          }}
        />
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
