/*!
 * @file      Register.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the register page for LookMeUp project.
 */

import "./register.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useContext, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@mui/material/Grid";
import commonApi from "../../api/common";
import Toast from "../../api/toast";
import { Context } from "../../components/context/Context";
import { useNavigate } from "react-router";
import { Button, InputAdornment, TextField } from "@mui/material";
import {
  AccountCircle,
  Email,
  CalendarToday,
  Key,
  Face,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import Link from "@mui/material/Link";
import moment from "moment";

export default function Register() {
  const { dispatch, isFetching } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const [isEmail, setIsEmail] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      dob: moment().format("yyyy-MM-DD"),
      password: ""
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required")
    }),
    onSubmit: async (values) => {
      await commonApi({
        action: "register",
        data: values
      })
        .then(({ DATA = {}, MESSAGE }) => {
          let { token, ...data } = DATA;
          dispatch({ type: "LOGIN_SUCCESS", payload: data, token: token });
          Toast.success(MESSAGE);
          navigate("/");
        })
        .catch((error) => {
          dispatch({ type: "LOGIN_FAILURE" });
          let { data } = error.response;
          if (data.DATA === "email") {
            setIsEmail(true);
          }
          console.error(error);
        });
    }
  });
  useEffect(() => {
    if (isEmail) {
      setIsEmail(false);
    }
  }, [formik.values.email]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container style={{ minHeight: "100vh" }}>
          <Grid item xs={12} sm={6}>
            <img
              src="/assets/Signup.png"
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
                minWidth: 300
              }}
            >
              <Grid container justify="center">
                <img src="/assets/logo.png" width={300} alt="logoname" />
              </Grid>

              <TextField
                label="First Name"
                margin="normal"
                name="firstName"
                error={formik.touched.firstName && formik.errors.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <AccountCircle color="primary" sx={{ mr: 1 }} />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                label="Last Name"
                margin="normal"
                name="lastName"
                error={formik.touched.lastName && formik.errors.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <Face color="primary" sx={{ mr: 1 }} />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                label="Email"
                margin="normal"
                name="email"
                type="email"
                error={(formik.touched.email && formik.errors.email) || isEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <Email color="primary" sx={{ mr: 1 }} />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                label="Date of Birth"
                margin="normal"
                type="date"
                name="dob"
                error={formik.touched.dob && formik.errors.dob}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dob}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <CalendarToday color="primary" sx={{ mr: 1 }} />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                label="Password"
                margin="normal"
                name="password"
                error={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <Key color="primary" sx={{ mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                disabled={!(formik.isValid && formik.dirty)}
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
