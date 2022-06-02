import React, { useContext } from "react";
import "./leftbar.css";
import { Home, Person } from "@mui/icons-material";
import { Context } from "../../components/context/Context";
export default function Leftbar() {
  const { dispatch } = useContext(Context);
  const HandleLogout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="leftbarListItem">
            <Home className="leftbarIcon" cursor="pointer" />
            <span className="leftbarListItemText">Feed</span>
          </li>
          <li className="leftbarListItem">
            <Person className="leftbarIcon" cursor="pointer" />
            <span className="leftbarListItemText">Profile</span>
          </li>
        </ul>
      </div>
      <button className="leftbarLogoutButton" onClick={HandleLogout}>
        Logout
      </button>
    </div>
  );
}
