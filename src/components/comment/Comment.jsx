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
        </div>
      </div>
    </>
  );
}
