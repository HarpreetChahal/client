import React from "react";
import {UploadFile } from "@mui/icons-material";
import Button from '@mui/material/Button';
import "./share.css"


export default function Share() {
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/person/1.jpg" alt="" />
                    <input placeholder="What's Happening?" className="shareInput" />
                </div>
                <hr className="shareHr" />
                <div className="shareBottom">
                    <div className="shareOption">
                    <Button variant="contained" color="success" startIcon={<UploadFile />}>
                       Upload Image
                    </Button>
                    </div>
                    <Button variant="contained" >
                        Create Post
                    </Button>
                </div>
            </div>

        </div>
    )
}