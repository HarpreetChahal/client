import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Homerightbar from "../../components/homerightbar/Homerightbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Profile from "../../components/profile/Profile";
import "./home.css";

export default function Home()
{
    return(
        <>
        <Topbar/>
        <div className="homeContainer">
         <Leftbar/>
         <Feed/>
         <Homerightbar/>   
        </div> 
        </>
    )
}
