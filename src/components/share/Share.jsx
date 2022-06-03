import React, { useState } from "react";
import { UploadFile } from "@mui/icons-material";
import Button from "@mui/material/Button";
import "./share.css";

import commonApi from "../../api/common";
import Toast from "../../api/toast";
export default function Share({ fetchPosts }) {
  const [desc, setDesc] = useState("");

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { desc: desc };
    if (file) {
      const fileData = new FormData()
      const fileName = Date.now() + file.name;
      fileData.append('name', fileName)
      fileData.append('file', file)
      await commonApi({
        action: "upload",
        data: fileData,
      }).then(async ({ MESSAGE }) => {
        data.images = [fileName];
        await commonApi({
          action: "createPost",
          data: data,
          config: {
            authToken: true,
          },
        }).then(({ DATA = {}, MESSAGE }) => {
          Toast.success(MESSAGE);
          fetchPosts();
          setDesc("");
          setFile(null);
        });
      });
    }
  };

  return (
    <form encType="multipart/form-data">
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
            {/* <Button
                variant="contained"
                color="success"
                startIcon={<UploadFile />}
             
              > 
                Upload Image
              </Button> */}
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Create Post
          </Button>
        </div>
      </div>
    </div>
    </form>
  );
}
