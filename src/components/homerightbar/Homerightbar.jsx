import React, { useContext, useState, useEffect } from "react";
import commonApi from "../../api/common";
import { Context } from "../context/Context";
import "./homerightbar.css";

export default function Homerightbar() {
  const { user, dispatch } = useContext(Context);
  const [friends, setFriends] = useState([]);
  const fetchSuggestions = async () => {
    await commonApi({
      action: "suggestions",
      data: {
        options: {
          pagination: false,
          sort: { createdAt: -1 }
        }
      },
      config: {
        authToken: true
      }
    }).then(({ DATA = {} }) => {
      setFriends(DATA.data);
    });
  };
  const followFriend = async (id) => {
    await commonApi({
      action: "followFriend",
      data: {
        followingId: id
      },
      config: {
        authToken: true
      }
    }).then(async ({ DATA = {} }) => {
      fetchSuggestions();
      await commonApi({
        action: "getUser",
        parameters: [user._id],
        config: {
          authToken: true
        }
      }).then(({ DATA = {} }) => {
        dispatch({ type: "UPDATE_USER", payload: DATA });
      });
    });
  };
  useEffect(() => {
    fetchSuggestions();
  }, [user]);

  return (
    <div className="rightbar">
      <div className="homerightbarWrapper">
        <div className="SuggestionsCard">
          <h3>Suggestions</h3>
          <h5>Add Friends</h5>
          {friends.map((friend) => {
            return (
              <div className="follower">
                <div>
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
          {friends.length===0 && <div>no Suggestions Found</div>}
        </div>
      </div>
    </div>
  );
}
