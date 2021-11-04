import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Avatar } from "@mui/material";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useHistory } from "react-router-dom";

import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";

import NavBarItem from "./NavBarItem";

const useStyles = makeStyles(() => ({
  mainLogo: {
    color: "#fff",
    fontSize: "24px !important",
    fontWeight: "900 !important",
  },
  drawer: {
    width: "65%",
  },
  profilePicture: {
    width: "70px !important",
    height: "70px !important",
    border: "2px solid",
  },
  username: {
    fontWeight: "700 !important",
  },
  loginBtn: {
    color: "#fff",
  },
}));

function DrawerComponent({ currentPageName, isLoggedIn, setIsLoggedIn }) {
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
        getAPIBaseURL() + `/user/clear_notification_token`,
        config
      );
    } catch (error) {
      console.log(error);
    }
  }

  const logoutHandler = () => {
    localStorage.clear();
    clearNotificationToken();
    setIsLoggedIn(false);
    history.push("/");
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
            <div>
              <ListItem>
                <Grid container justifyContent="center">
                  <Avatar
                    alt="PP"
                    className={classes.profilePicture}
                    src={user_profile_picture}
                  />
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container justifyContent="center">
                  <Typography className={classes.username}>
                    {username}
                  </Typography>
                </Grid>
              </ListItem>
            </div>
          )}
          <ListItem>
            <Grid container justifyContent="center">
              <Link to={"/user_search"}>
                <Button
                  style={{
                    color: "rgba(0, 0, 0, 0.5)",
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    textTransform: "none",
                  }}
                >
                  Search Users <SearchIcon sx={{ ml: 1 }} />
                </Button>
              </Link>
            </Grid>
          </ListItem>

          <NavBarItem
            name="HOME"
            path=""
            color="black"
            isActiveDrawer={currentPageName === "Home" ? "drawer-active" : ""}
          />
          <NavBarItem
            name="MATCHES"
            path="matches"
            color="black"
            isActiveDrawer={
              currentPageName === "Matches" ? "drawer-active" : ""
            }
          />
          <NavBarItem
            name="ROOMS"
            path="rooms"
            color="black"
            isActiveDrawer={currentPageName === "Rooms" ? "drawer-active" : ""}
          />
          <NavBarItem
            name="BLOGS"
            path="blogs"
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

              <Link to="/" className="nav-link">
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
                  variant="contained"
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

          <Link to="/">
            <Typography className={classes.mainLogo}>Foot2gether</Typography>
          </Link>
        </Grid>
      )}
    </>
  );
}
export default DrawerComponent;
