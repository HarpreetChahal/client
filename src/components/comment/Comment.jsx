import React from "react";
import "./comment.css"


export default function Comment()
{
    return(
        <>
        <div className="viewComments">
        <span>View All Comments</span>
    </div>
    <div className="profileComment">
<img className="profilePommentProfileImg" src="/assets/person/1.jpg" alt=""/>
<span className="postCommentText">My first comment..</span>
    </div>
    </>
    )
}