import { useState } from "react";
import Overlay from "../components/NavBar/Overlay";
import { Grid, Box, Button, Typography, TextField, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

import firebase from "../server/firebase-notifications/firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  formTitle: {
    color: "#000000 !important",
    fontSize: "25px !important",
    fontWeight: "600 !important",
  },
  formField: {
    width: "100%",
  },
});

function Login() {
  const history = useHistory();

  //check if user already logged in
  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status && login_status.login) {
    if (login_status.is_admin) {
      history.push("/admin/home");
    } else {
      history.push("/home");
    }
  }

  const classes = useStyles();

  const [isPending, setIsPending] = useState(false);
  const [loginError, setLoginError] = useState(false);

  async function getNotificationToken() {
    const msg = firebase.messaging();
    await msg.requestPermission();

    try {
      const token = await msg.getToken();
      return token;
    } catch (error) {
      console.log(error);
    }
  }

  async function saveNotificationToken(notification_token) {
    try {
      const token = JSON.parse(localStorage.getItem("login")).token;
      let config = { headers: { Authorization: `Bearer ${token}` } };

      let response = await axios.post(
        "http://localhost:8000/user/save_notification_token",
        { notification_token },
        config
      );
      if (response.status === 200) {
        console.log("Successfully Saved Token!");
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async (event) => {
    setIsPending(true);
    event.preventDefault();
    const login_data = new FormData(event.currentTarget);
    const email = login_data.get("email");
    const password = login_data.get("password");

    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Successfully logged in!");

        const JWT_token = response.data.token;
        const is_admin = response.data.isAdmin;
        const {
          user_id,
          username,
          user_profile_picture,
          user_cover_photo,
          user_bio,
        } = response.data.user;

        localStorage.setItem(
          "login",
          JSON.stringify({
            login: true,
            token: JWT_token,
            is_admin,
            user_id,
            username,
            user_profile_picture,
            user_cover_photo,
            user_bio,
          })
        );

        setLoginError(false);
        getNotificationToken();

        let notification_token = await getNotificationToken();
        saveNotificationToken(notification_token);

        if (is_admin) {
          history.push("/admin/home");
        } else {
          history.push("/home");
        }
      } else {
        console.log("Something went wrong!");
        setIsPending(false);
        setLoginError(true);
      }
    } catch (err) {
      if (err) {
        if (err.response.status === 401) {
          console.log("Wrong Credentials!");
        }
        console.log(err);
      }
      setIsPending(false);
      setLoginError(true);
    }
  };

  const login_form = (
    <Grid
      container
      className={classes.mainContainer}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={style} style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <Typography
          id="transition-modal-title"
          className={classes.formTitle}
          sx={{ mb: 5 }}
          style={{ textAlign: "center" }}
        >
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Wrong Credentials! Try again.
            </Alert>
          )}

          <TextField
            sx={{ mb: 3 }}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            inputProps={{
              type: "email",
              maxLength: 100,
            }}
          />

          <TextField
            sx={{ mb: 3 }}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{
              minLength: 6,
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>

        <Grid container justifyContent="space-between">
          <Link to={"/signup"} style={{ color: "blue" }}>
            Create Account
          </Link>
        </Grid>
      </Box>
    </Grid>
  );

  return <Overlay NavBarContent={login_form} />;
}

export default Login;
