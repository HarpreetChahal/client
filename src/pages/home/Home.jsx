/*!
* @file      Home.jsx
* @author    Dharmik Dholariya and Harpreet Singh 
* @date      02-06-2022
* @brief     This is the home page for LookMeUp project.
*/



import React ,{useState}from "react";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/Feed";
import Homerightbar from "../../components/homerightbar/Homerightbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Profile from "../../components/profile/Profile";
import "./home.css";
import commonApi from "../../api/common"
export default function Home({handleLogout})
{
    const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    await commonApi({
      action: "fetchPost",
      data: {
        options: {
          pagination: false,
          populate: [
            { path: "userId", model: "user", select: ["_id", "fullName","profilePicture"] },
            {
              path: "comments.userId",
              model: "user",
              select: ["_id", "fullName","profilePicture"],
            },
          ],
          sort: { createdAt: -1 },
        },
      },
      config: {
        authToken: true,
      },
    }).then(({ DATA }) => {
      setPosts(DATA.data);
    });
  };
    return(
        <>
        <Topbar fetchPosts={fetchPosts} />
        <div className="homeContainer">
         <Leftbar fetchPosts={fetchPosts} handleLogout={handleLogout}/>
         <Feed fetchPosts={fetchPosts} posts={posts}/>
         {/* <Rightbar/>    */}
      
         <Homerightbar/>   
        </div> 
        </>
    )
}
