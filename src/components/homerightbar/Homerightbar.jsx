import React, { useContext, useState, useEffect } from "react";
import commonApi from "../../api/common";
import { Context } from "../context/Context";
import "./homerightbar.css";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Homerightbar({fetchPosts}) {
  const { user, dispatch } = useContext(Context);
  const token = JSON.parse(localStorage.getItem("token"));
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const fetchSuggestions = async () => {
    await commonApi({
      action: "suggestions",
      data: {
        options: {
          pagination: false,
          sort: { createdAt: -1 },
        },
      },
      config: {
        authToken: true,
      },
    }).then(({ DATA = {} }) => {
      setFriends(DATA.data);
      fetchPosts()
    });
  };
  const followFriend = async (id) => {
    await commonApi({
      action: "followFriend",
      data: {
        followingId: id,
      },
      config: {
        authToken: true,
      },
    }).then(async ({ DATA = {} }) => {
      fetchSuggestions();
      await commonApi({
        action: "getUser",
        parameters: [user._id],
        config: {
          authToken: true,
        },
      }).then(({ DATA = {} }) => {
        dispatch({ type: "UPDATE_USER", payload: DATA });
      });
    });
  };
  useEffect(() => {
    if (user?._id && token) {
      fetchSuggestions();
    }
  }, [user._id, token]);

  return (
    <div className="rightbar">
      <div className="homerightbarWrapper">
        <div className="SuggestionsCard">
          <h3>Suggestions</h3>
          <h5>Add Friends</h5>
          {friends.map((friend) => {
            return (
              <div className="follower" key={friend._id}>
                <div style={{cursor:"pointer"}}
                  onClick={() => {
                    navigate("/userProfile?userId=" + friend._id);
                  }}
                >
                  <img
                    src={friend.profilePicture || "assets/person/1.jpg"}
                    alt=""
                    className="followerImg"
                  />
                  <div className="username">
                    <span>{friend.fullName}</span>
                  </div>
                </div>

                <button
                  className="add-friend-button"
                  onClick={() => {
                    followFriend(friend._id);
                  }}
                >
                  Follow
                </button>
              </div>
            );
          })}
          {friends.length === 0 && (
            <div className="no-suggestions-found">
              {/* <div className="no-post-icon"> */}
              <Person fontSize="medium" sx={{ mt: 4, mb: 0 }} />
              {/* </div> */}
              <p className="no-suggestions-text">No Suggestions Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
