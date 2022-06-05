/*!
* @file      Leftbar.jsx
* @author    Dharmik Dholariya and Harpreet Singh 
* @date      02-06-2022
* @brief     This is the leftbar component page (side menu) for LookMeUp project.
*/


import React, { useContext } from "react";
import "./leftbar.css";
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
import { Context } from "../../components/context/Context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Leftbar({fetchPosts}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(Context);

  const handleLogout = async (e) => {
    localStorage.clear();
    e.preventDefault();
    setOpen(false);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
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
          left: "1%",
        }}
      >
        <nav aria-label="main list">
          <List>
            <ListItem
              disablePadding
              onClick={() =>{
                fetchPosts()
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
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

      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          position: "fixed",
          bottom: 10,
          left: "1%",
        }}
      >
        Logout
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to logout?"}</DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={handleClose}
            
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            onClick={handleLogout}
          >
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
