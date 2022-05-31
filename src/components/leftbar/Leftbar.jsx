import React from "react";
import "./leftbar.css";
import{ Home, Person } from "@mui/icons-material";


export default function Leftbar()
{
    return(
        <div className="leftbar">
            <div className="leftbarWrapper">
                <ul className="leftbarList">
                    <li className="leftbarListItem">
                        <Home className="leftbarIcon"/>
                        <span className="leftbarListItemText">Home</span>
                    </li>
                    <li className="leftbarListItem">
                        <Person className="leftbarIcon"/>
                        <span className="leftbarListItemText">Profile</span>
                    </li>
                </ul>
                <button className="leftbarButton">Show</button>
            </div>
            <button className="leftbarLogoutButton">Logout</button>
        </div>
    )
}