/*!
 * @file      Login.jsx
 * @author    Dharmik Dholariya and Harpreet Singh
 * @date      02-06-2022
 * @brief     This is the login page for LookMeUp project.
 */

import React, { useState, useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";
import "react-notifications-component/dist/theme.css";
import "./login.css";
import IconButton from "@material-ui/core/IconButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Context } from "../../components/context/Context";
import { Button, InputAdornment, TextField } from "@mui/material";
import Toast from "../../api/toast";
import {
  // AccountCircle,
  Email,
  // CalendarToday,
  Key,
  // Face,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { useNavigate } from "react-router";
// import { useRouter } from "next/router"
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import commonApi from "../../api/common";
export default function Login() {
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
  const [isPassword, setIsPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required"),
      email: Yup.string().required("Required")
    }),
    onSubmit: async (values) => {
      //  const {email,password}=values
      await commonApi({
        action: "login",
        data: values
      })
        .then(({ DATA = {}, MESSAGE }) => {
          let { token, ...data } = DATA;
          dispatch({ type: "LOGIN_SUCCESS", payload: data, token: token });
          setIsEmail(false);
          setIsPassword(false);
          Toast.success(MESSAGE);
          navigate("/");
        })
        .catch((error) => {
          dispatch({ type: "LOGIN_FAILURE" });
          let { data } = error.response;
          if (data.DATA === "email") {
            setIsEmail(true);
          }
          if (data.DATA === "password") {
            setIsPassword(true);
          }

          console.error(error);
        });
    }
  });
  useEffect(() => {
    if (isEmail) {
      setIsEmail(false);
    }
    if (isPassword) {
      setIsPassword(false);
    }
  }, [formik.values.email, formik.values.password]);
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
                minWidth: 300,
                marginTop: 100
              }}
            >
              <Grid container justify="center">
                <img src="/assets/logo.png" width={300} alt="logoname" />
              </Grid>

              <TextField
                label="Email"
                margin="normal"
                name="email"
                type="text"
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
              {/* {formik.touched.email && formik.errors.email ? (
                <div style={{color:"red"}}>{formik.errors.email}</div>
              ) : null} */}
              <TextField
                type={showPassword ? "text" : "password"}
                label="Password"
                margin="normal"
                name="password"
                error={
                  (formik.touched.password && formik.errors.password) ||
                  isPassword
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <Key color="primary" sx={{ mr: 1 }} />
                    </InputAdornment>
                  )
                  // ,endAdornment:(
                  //   <InputAdornment position="end">
                  //     <IconButton
                  //       onClick={handleClickShowPassword}
                  //       onMouseDown={handleMouseDownPassword}
                  //     >
                  //       {showPassword ? <Visibility /> : <VisibilityOff />}
                  //     </IconButton>
                  //   </InputAdornment>
                  // )
                }}
              />
              {/* {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null} */}
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
                disabled={!(formik.isValid && formik.dirty)}
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
