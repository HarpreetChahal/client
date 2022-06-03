import React from "react";
import "./comment.css"


export default function Comment({user,comment,date})
{
    return(
        <>
        <div className="viewComments">
        {/* <span>View more replies</span> */}
    </div>
    <div className="profileComment">
<img className="profilePommentProfileImg" src="/assets/person/1.jpg" alt=""/>
<span className="postCommentText">{comment}.</span>
    </div>
    </>
    )
}