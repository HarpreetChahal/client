import React from "react";
import "./comment.css"


export default function Comment()
{
    return(
        <>
        <div className="viewComments">
        <span>View more replies</span>
    </div>
    <div className="profileComment">
<img className="profilePommentProfileImg" src="/assets/person/1.jpg" alt=""/>
<span className="postCommentText">Its been a heavenly experience..</span>
    </div>
    </>
    )
}