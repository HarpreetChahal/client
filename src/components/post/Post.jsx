import React, { useState } from "react";
import "./post.css";
import Comment from "../comment/Comment";
import moment from "moment";
import {
  ThumbDownOffAlt,
  MoreVertOutlined,
  FavoriteBorder,
  Send,
} from "@mui/icons-material";
import CommentIcon from '@mui/icons-material/Comment';
import commonApi from "../../api/common";
import Toast from "../../api/toast";

export default function Post(props) {
  const PF="http://localhost:5000/assets/"
  const { desc, date, userName, comments, postId ,images} = props;
  let imgPath="assets/post/2.jpg"  
  if(images.length!==0)
  {
    imgPath=PF+images[0]
  }
  const [comment, setComment] = useState("");

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
    });
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src="/assets/person/1.jpg" alt="/assets/person/1.jpg"  />
            <span className="postUsername">{userName}</span>
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
            <FavoriteBorder cursor="pointer" />
            <span className="postLikeText">2 Like </span>
            <ThumbDownOffAlt cursor="pointer" />
            <span className="postDislikeText">1 Dislike </span>
          </div>
          <div className="postBottomRight">
          <CommentIcon cursor="pointer" />
            <span className="postCommentText"> {comments.length} Comments</span>
          </div>
        </div>

        <div className="writeComment">
          <img
            className="commentProfileImg"
            src="/assets/person/1.jpg"
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
          <div className="sendButton">
            <Send
              sx={{
                color: "#1877f2",
              }}
              onClick={createComment}
            />
          </div>
        </div>

        {/* <div className="viewComments">
                        <span>View All Comments</span>
                    </div>
                    <div className="profileComment">
                <img className="profilePommentProfileImg" src="/assets/person/1.jpg" alt=""/>
                <span className="postCommentText">My first comment..</span>
                    </div> */}
        {comments.map((c) => {
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
