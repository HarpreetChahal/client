import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import 'react-notifications-component/dist/theme.css'
import "./login.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import {
  // AccountCircle,
  Email,
  // CalendarToday,
  Key,
  // Face,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import commonApi from "../../api/common";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await commonApi({
      action: "login",
      data: formData,
    }).then(({ DATA = {} }) => {
      console.log("DATA",DATA)
      navigate("/");
  
      setFormData({
        email: "",
        password: "",
      });
    });
   
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container style={{ minHeight: "100vh" }}>
          <Grid item xs={12} sm={6}>
            <img
              src="/assets/signup1.png"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt="logo"
            />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            alignItems="center"
            direction="column"
            justify="space-between"
            style={{ padding: 10 }}
          >
            <div />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 600,
                minWidth: 300,
              }}
            >
              <Grid container justify="center">
                <img src="/assets/logo.png" width={300} alt="logoname" />
              </Grid>

              <TextField
                label="email"
                margin="normal"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                type="password"
                label="password"
                margin="normal"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <Key color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
              >
                Sign In
              </Button>
              {/* <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid> */}
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
