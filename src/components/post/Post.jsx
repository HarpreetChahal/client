import React from "react";
import "./post.css"
import { ThumbDownOffAlt, MoreVertOutlined, FavoriteBorder } from "@mui/icons-material";


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
                    <img className="postImg" src="assets/post/1.jpg" alt=""/>
                </div>
                <div className="postBottom">
                <div className="postBottomLeft">
                    <FavoriteBorder/>
                    <span className="postLikeText">2 Likes </span>
                    <ThumbDownOffAlt/>
                    <span className="postDislikeText">1 Dislike </span>
                </div>
                    <div className="postBottomRight">
                        <span className="postCommentText"> 10 Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}