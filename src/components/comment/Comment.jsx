import React from "react";
import "./comment.css";
import moment from "moment";
export default function Comment({ user, comment, date }) {
  return (
    <>
      <div className="viewComments">{/* <span>View more replies</span> */}</div>
      <div className="profileComment">
        <img
          className="profilePommentProfileImg"
          src="/assets/person/1.jpg"
          alt=""
        />

        {/* <div>Dharmik</div>
        
        <span className="postCommentText"> THis is a beafutiful applica</span>
        <div> 2 h ago</div> */}
        {/* 
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", color: "#000" }}>{user?.fullName}</div>
            <span className="postCommentText">
              {comment}
            </span>
          </div>
          <div> {moment(date).fromNow()}</div>
        </div> */}

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "8px",
                color: "rgb(0, 0, 0)",
                paddingTop: "7px",
              }}
            >
              DHOLARIYA DIVYESH
            </div>
            <span class="postCommentText">Hello I am a Blogger</span>
          </div>
          <div
            style={{
              fontSize: "8px",
              paddingTop: "28px",
              paddingBottom: "5px",
              paddingRight: "20px",
            }}
          >
            15 minutes ago
          </div>
        </div>
      </div>
    </>
  );
}
