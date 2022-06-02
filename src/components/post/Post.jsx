import React from "react";
import "./post.css"
import Comment from "../comment/Comment";
import { ThumbDownOffAlt, MoreVertOutlined, FavoriteBorder, Send } from "@mui/icons-material";

export default function Post() {
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfileImg" src="/assets/person/1.jpg" alt="" />
                        <span className="postUsername">John Doe</span>
                        <span className="postDate">10 mins ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertOutlined />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">This is my first post</span>
                    <img className="postImg" src="assets/post/2.jpg" alt=""/>
                </div>
                <div className="postBottom">
                <div className="postBottomLeft">
                    <FavoriteBorder cursor="pointer"/>
                    <span className="postLikeText">2 Like </span>
                    <ThumbDownOffAlt cursor="pointer"/>
                    <span className="postDislikeText">1 Dislike </span>
                </div>
                    <div className="postBottomRight">
                        <span className="postCommentText"> 10 Comments</span>
                    </div>
                    
                </div>
                <div className="writeComment">
                <img className="commentProfileImg" src="/assets/person/1.jpg" alt=""/>
                    <input placeholder="Write a comment" className="commentInput"/>
                    <div className="sendButton">
                    <Send  sx={{ 
                        color: "#1877f2", 
                         }}/>
                    </div>
                    

                    </div>
                    {/* <div className="viewComments">
                        <span>View All Comments</span>
                    </div>
                    <div className="profileComment">
                <img className="profilePommentProfileImg" src="/assets/person/1.jpg" alt=""/>
                <span className="postCommentText">My first comment..</span>
                    </div> */}
                    <Comment/>
            </div>
        </div>
    )
}