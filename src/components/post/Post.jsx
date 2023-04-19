/*!
 * @file      Post.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the post component page for LookMeUp project.
 */

import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import Comment from "../comment/Comment";
import moment from "moment";
import {
  ThumbDownOffAlt,
  MoreVertOutlined,
  Send,
  FavoriteBorder,
  Edit,
  Delete,
} from "@mui/icons-material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import commonApi from "../../api/common";
import Toast from "../../api/toast";
import { Context } from "../context/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { imageUrl } from "../../api";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
export default function Post(props) {
  const PF = imageUrl;
  const navigate = useNavigate();
  const {
    desc,
    date,
    userData,
    comments,
    postId,
    images,
    likes,
    dislikes,
    fetchPosts,
  } = props;
  let imgPath = images[0];
  const { user } = useContext(Context);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  useEffect(() => {
    setIsLiked(likes.includes(user._id));
    setIsDisLiked(dislikes.includes(user._id));
  }, [user._id, dislikes, likes]);
  const likeHandler = async () => {
    try {
      await commonApi({
        action: "likeDislike",
        data: {
          postId: postId,
          action: 0,
        },
        config: {
          authToken: true,
        },
      }).then(({ MESSAGE }) => {
        fetchPosts();
        setIsLiked(!isLiked);
      });
    } catch (err) {}
  };
  const disLikeHandler = async () => {
    try {
      await commonApi({
        action: "likeDislike",
        data: {
          postId: postId,
          action: 1,
        },
        config: {
          authToken: true,
        },
      }).then(({ MESSAGE }) => {
        fetchPosts();
        isDisLiked(!isDisLiked);
      });
    } catch (err) {}
  };
  const onlyLike = async () => {
    try {
      await commonApi({
        action: "likeDislike",
        data: {
          postId: postId,
          action: 3,
        },
        config: {
          authToken: true,
        },
      }).then(({ MESSAGE }) => {
        fetchPosts();
        isDisLiked(!isDisLiked);
      });
    } catch (err) {}
  };
  const onlyDisLike = async () => {
    try {
      await commonApi({
        action: "likeDislike",
        data: {
          postId: postId,
          action: 4,
        },
        config: {
          authToken: true,
        },
      }).then(({ MESSAGE }) => {
        fetchPosts();
        isDisLiked(!isDisLiked);
      });
    } catch (err) {}
  };
  const createComment = async (e) => {
    e.preventDefault();

    await commonApi({
      action: "createComment",
      data: {
        postId: postId,
        comment: comment,
      },
      config: {
        authToken: true,
      },
    }).then(({ MESSAGE }) => {
      setComment("");
      Toast.success(MESSAGE);
      fetchPosts();
    });
  };

  const validateComment = () => {
    return comment !== "";
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    await commonApi({ action: "deletePost", parameters: [postId] }).then(() => {
      fetchPosts();
      handleClose();
    });
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div
            className="postTopLeft"
            style={{ cursor: "pointer" }}
            onClick={() => {
              userData._id === user._id
                ? navigate("/profile")
                : navigate("/userProfile?userId=" + userData._id);
            }}
          >
            <img
              className="postProfileImg"
              src={userData.profilePicture || "/assets/person/1.jpg"}
              alt=""
            />
            <span className="postUsername">{userData.fullName}</span>
            <span className="postDate">{moment(date).fromNow()}</span>
          </div>
          <div className="postTopRight">
            {userData._id === user._id && (
              <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                <MoreVertOutlined />
              </IconButton>
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem>
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                Edit
              </MenuItem> */}

              <MenuItem onClick={handleDeletePost}>
                <ListItemIcon>
                  <Delete fontSize="small" />
                </ListItemIcon>
                Delete
              </MenuItem>
            </Menu>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{desc}</span>
          <img className="postImg" src={imgPath} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {!isLiked && (
              <FavoriteBorder cursor="pointer" onClick={likeHandler} />
            )}
            {isLiked && (
              <FavoriteIcon
                color={"error"}
                cursor="pointer"
                onClick={onlyLike}
              />
            )}
            <span className="postLikeText">{likes.length} Like </span>
            {!isDisLiked && (
              <ThumbDownOffAlt cursor="pointer" onClick={disLikeHandler} />
            )}
            {isDisLiked && (
              <ThumbDownIcon cursor="pointer" onClick={onlyDisLike} />
            )}

            <span className="postDislikeText">{dislikes.length} DisLike </span>
          </div>
          <div
            className="postBottomRight"
            onClick={() => {
              if (comments.length !== 0) {
                setShowComment(!showComment);
              }
            }}
          >
            {/* <span className="postCommentText" onClick={()=>{setShowComment(!showComment)}}> {comments.length} Comment</span> */}

            <CommentIcon cursor="pointer" />
            <span className="postCommentText"> {comments.length} Comments</span>
          </div>
        </div>

        <div className="writeComment">
          <img
            className="commentProfileImg"
            src={user?.profilePicture || "/assets/person/1.jpg"}
            alt=""
          />
          <input
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            onKeyPress={(ev) => {
              if (ev.key === "Enter") {
                ev.preventDefault();
                createComment(ev)
              }
            }}
       
            className="commentInput"
          />
          {validateComment() && (
            <div className="sendButton">
              <Send
                sx={{
                  color: "#1877f2",
                }}
                onClick={createComment}
              />
            </div>
          )}
        </div>

        <div
          className="viewComments"
          onClick={() => {
            if (comments.length !== 0) {
              setShowComment(!showComment);
            }
          }}
        >
          {comments.length > 0 && (
            <span className="viewCommentsText">
              {showComment ? "Hide All" : "View All"} Comments
            </span>
          )}
        </div>
        {/* <div className="profileComment">
                <img className="profilePommentProfileImg" src="/assets/person/1.jpg" alt=""/>
                <span className="postCommentText">My first comment..</span>
                    </div>  */}
        {showComment &&
          comments.map((c) => {
            return (
              <Comment
                comment={c.comment}
                date={c.at}
                user={c.userId}
                key={c._id}
              />
            );
          })}
      </div>
    </div>
  );
}
