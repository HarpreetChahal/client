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
} from "@mui/icons-material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import commonApi from "../../api/common";
import Toast from "../../api/toast";
import { Context } from "../context/Context";

export default function Post(props) {
  const PF = "http://localhost:5000/assets/";
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
  let imgPath = PF + images[0];
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
          action: true,
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
          action: false,
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

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={userData.profilePicture || "/assets/person/1.jpg"}
              alt="/assets/person/1.jpg"
            />
            <span className="postUsername">{userData.fullName}</span>
            <span className="postDate">{moment(date).fromNow()}</span>
          </div>
          <div className="postTopRight">
            <MoreVertOutlined />
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
                onClick={disLikeHandler}
              />
            )}
            <span className="postLikeText">{likes.length} Like </span>
            {!isDisLiked && (
              <ThumbDownOffAlt cursor="pointer" onClick={disLikeHandler} />
            )}
            {isDisLiked && (
              <ThumbDownIcon cursor="pointer" onClick={likeHandler} />
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
