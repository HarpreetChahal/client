/*!
 * @file      Leftbar.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the leftbar component page (side menu) for LookMeUp project.
 */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomeLeftBar.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router";
import { Context } from "../context/Context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Leftbar({ fetchPosts, handleLogout }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="leftbar">
      <Box
        sx={{
          border: 2,
          borderRadius: 2,
          boxShadow: 3,
          borderColor: "background.paper",
          // mt: 2.5, ml: 1,
          width: "40%",
          maxWidth: 320,
          bgcolor: "background.paper",
          position: "fixed",
          top: 100,
          left: "1%"
        }}
      >
        <nav aria-label="main list">
          <List>
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/");
                fetchPosts();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth"
                });
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Feed" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/profile");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>

                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </div>
  );
}
