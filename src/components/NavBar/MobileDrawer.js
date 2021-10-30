import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import { Button, Avatar } from "@mui/material";

import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import NavBarItem from "./NavBarItem";

const useStyles = makeStyles(() => ({
  mainLogo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: 900,
  },
  drawer: {
    width: "65%",
  },
  profilePicture: {
    width: 70,
    height: 70,
    border: "2px solid",
  },

  loginBtn: {
    color: "#fff",
    backgroundColor: "#2e7d32",
    borderColor: "#2e7d32",
  },
}));

function DrawerComponent({ currentPageName, isLoggedIn }) {
  const classes = useStyles();
  const history = useHistory();
  const [openDrawer, setOpenDrawer] = useState(false);

  const login_status = JSON.parse(localStorage.getItem("login"));

  let token = "";
  let username = "";
  let user_profile_picture = "";

  if (login_status) {
    token = login_status.token;
    username = login_status.username;
    user_profile_picture = login_status.user_profile_picture;
  }

  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  async function clearNotificationToken() {
    try {
      await axios.delete(
        `http://localhost:8000/user/clear_notification_token`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  }

  const logoutHandler = () => {
    localStorage.clear();
    clearNotificationToken();
    history.push("/login");
  };

  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: classes.drawer }}
      >
        <List>
          {isLoggedIn && (
            <ListItem>
              <Avatar
                alt="PP"
                className={classes.profilePicture}
                src={user_profile_picture}
                sx={{ ml: 8, mb: 2 }}
              />
            </ListItem>
          )}
          <NavBarItem
            name="HOME"
            color="black"
            isActiveDrawer={currentPageName === "Home" ? "drawer-active" : ""}
          />
          <NavBarItem
            name="MATCHES"
            color="black"
            isActiveDrawer={
              currentPageName === "Matches" ? "drawer-active" : ""
            }
          />
          <NavBarItem
            name="ROOMS"
            color="black"
            isActiveDrawer={currentPageName === "Rooms" ? "drawer-active" : ""}
          />
          <NavBarItem
            name="BLOGS"
            color="black"
            isActiveDrawer={currentPageName === "Blogs" ? "drawer-active" : ""}
          />

          {isLoggedIn ? (
            <div>
              <Link
                to="/my_profile"
                className="nav-link"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem button>
                  <ListItemText primary="MY PROFILE" />
                </ListItem>
              </Link>

              <Link to="/login" className="nav-link">
                <ListItem button onClick={logoutHandler}>
                  <ListItemText
                    style={{ color: "#212529" }}
                    primary="LOG OUT"
                  />
                </ListItem>
              </Link>
            </div>
          ) : (
            <ListItem>
              <Link to={"/login"}>
                <Button
                  className={classes.loginBtn}
                  variant="outlined"
                  color="success"
                  sx={{ ml: 2, mt: 2 }}
                >
                  Log in
                </Button>
              </Link>
            </ListItem>
          )}
        </List>
      </Drawer>

      {!openDrawer && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>

          <Link to="/home">
            <Typography className={classes.mainLogo}>Foot2gether</Typography>
          </Link>
        </Grid>
      )}
    </>
  );
}
export default DrawerComponent;
