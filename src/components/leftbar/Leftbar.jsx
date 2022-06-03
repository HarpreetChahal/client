import React, { useContext } from "react";
import "./leftbar.css";

import { Home, FavoriteBorder, Person, PersonAdd } from "@mui/icons-material";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from '@mui/material/DialogContent';
import DialogContentText from "@mui/material/DialogContentText";
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

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {Context} from "../../components/context/Context"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Leftbar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const {  dispatch } = useContext(Context);

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
          width: '40%',
          maxWidth: 320,
          bgcolor: 'background.paper',
          position: 'fixed',
          top: 100,
          left: "1%",
        }}
      >
        <nav aria-label="main list">
          <List>
            <ListItem disablePadding>
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
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You will have to login again
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
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
