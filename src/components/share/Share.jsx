import React, { useState } from "react";
import { UploadFile } from "@mui/icons-material";
import Button from "@mui/material/Button";
import "./share.css";

import commonApi from "../../api/common";
import Toast from "../../api/toast";
export default function Share({fetchPosts}) {
  const [desc, setDesc] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await commonApi({
      action: "createPost",
      data: { desc: desc },
      config: {
        authToken: true,
      },
    }).then(({ DATA = {}, MESSAGE }) => {
      Toast.success(MESSAGE);
      fetchPosts();
      setDesc("")
    });
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpg" alt="" />
          <input
            placeholder="What's Happening?"
            className="shareInput"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOption">
            <Button
              variant="contained"
              color="success"
              startIcon={<UploadFile />}
            >
              Upload Image
            </Button>
          </div>
          <Button variant="contained" onClick={handleSubmit}>
            Create Post
          </Button>
        </div>
      </div>
    </div>
  );
}
