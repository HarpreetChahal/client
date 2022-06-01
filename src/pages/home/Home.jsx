import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Comment from "../../components/comment/Comment";
import "./home.css";



export default function Home()
{
    return(
        <>
        <Topbar/>
        <div className="homeContainer">
         <Leftbar/>
         <Feed/>
         <Rightbar/>   
        </div> 
        </>
    )
}