import React from "react";
import {InsertPhoto,Label,Room,EmojiEmotions} from "@mui/icons-material";
import "./share.css"


export default function Share()
{
    return(
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/person/1.jpg" alt=""/>
                    <input placeholder="What's on your mind?" className="shareInput"/>
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOption">
                        <InsertPhoto htmlColor="blue" className="ShareIcon"/>
                        <span className="shareOptionText">Photo</span>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Emotions</span>
                </div>
                    </div>
                    <button className="shareButton">Post</button>
                </div>
            </div>
           
        </div>
    )
}