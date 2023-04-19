/*!
 * @file      Share.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the share component page (create post) for LookMeUp project.
 */

import React, { useContext, useState } from "react";
import "./share.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { Cancel } from "@mui/icons-material";

import commonApi from "../../api/common";
import Toast from "../../api/toast";
import { Context } from "../context/Context";
import { imageUrl } from "../../api";
const Input = styled("input")({
  display: "none"
});

export default function Share({ fetchPosts }) {
  const { user } = useContext(Context);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const isFormValid = () => {
    return desc !== "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { desc: desc };

    if (file) {
      const fileData = new FormData();
      const fileName = Date.now() + file.name;
      fileData.append("name", fileName);
      fileData.append("file", file);
      await commonApi({
        action: "upload",
        data: fileData
      });
      data.images = [imageUrl + fileName];
    }
    await commonApi({
      action: "createPost",
      data: data,
      config: {
        authToken: true
      }
    }).then(({ DATA = {}, MESSAGE }) => {
      Toast.success(MESSAGE);
      fetchPosts();
      setDesc("");
      setFile(null);
    });
  };

  return (
    <div className="share">
      <form encType="multipart/form-data">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={user?.profilePicture || "/assets/person/1.jpg"}
              alt=""
            />
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
          {file && (
            <div className="shareImgContainer">
              <img
                className="shareImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <Cancel
                className="shareCancelImg"
                onClick={() => setFile(null)}
              />
            </div>
          )}

          <div className="shareBottom">
            <div className="shareOption">
              <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <Button
                    variant="contained"
                    type="file"
                    id="fileInput"
                    color="success"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Upload
                  </Button>

                  {/* <input
                    type="file"
                    id="fileInput"
                    onChange={(e) => setFile(e.target.files[0])}
                  /> */}
                </label>
              </Stack>
            </div>
            <Button
              variant="contained"
              type="submit"
              disabled={!isFormValid()}
              onClick={handleSubmit}
            >
              Create Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
