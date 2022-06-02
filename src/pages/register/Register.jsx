import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import commonApi from "../../api/common";
import "./register.css";
import { Context } from "../../components/context/Context";

import { useNavigate } from "react-router";
import Toast from "../../api/toast";

import { Button, InputAdornment, TextField } from "@mui/material";
import {
  AccountCircle,
  Email,
  CalendarToday,
  Key,
  Face,
} from "@mui/icons-material";
import Link from "@mui/material/Link";

export default function Register() {
  const { dispatch, isFetching } = useContext(Context);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await commonApi({
      action: "register",
      data: formData,
    })
      .then(({ DATA = {}, MESSAGE }) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: DATA });
        Toast.success(MESSAGE);
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          dob: "",
          password: "",
        });
      
        navigate("/");
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE" });
        console.error(error);
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
                label="first name"
                margin="normal"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <AccountCircle color="primary" sx={{ mr: 1 }}/>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="last name"
                margin="normal"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <Face color="primary" sx={{ mr: 1 }}/>
                    </InputAdornment>
                  ),
                }}
              />
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
                      <Email color="primary" sx={{ mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="date of birth"
                margin="normal"
                type={"date"}
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <CalendarToday color="primary" sx={{ mr: 1 }}/>
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
                      <Key color="primary" sx={{ mr: 1 }}/>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                disabled={isFetching}
              >
                Sign Up
              </Button>
              <Grid item>
                <Link
                  href="/login"
                  style={{ cursor: "pointer" }}
                  variant="body2"
                >
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
