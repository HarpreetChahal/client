import React from "react";
import "./leftbar.css";

import { Home, FavoriteBorder, Person } from "@mui/icons-material";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
// import DialogContent from '@mui/material/DialogContent';
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Leftbar() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="leftbar">
      <div className="leftbarTop">
        {/* <div className="leftbarLogoutButton"> */}

        <Button variant="contained" sx={{ mt: 5 }}>
          Home
        </Button>
        <Button variant="contained" sx={{ mt: 10 }}>
          Profile
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Log out</Button>
          </DialogActions>
        </Dialog>
        <Button variant="contained" onClick={handleClickOpen} sx={{ mt: 15 }}>
          Logout
        </Button>
      </div>
    </div>
  );
}
