import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";

import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

import {
  List,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

import NavBarItem from "./NavBarItem";

const useStyles = makeStyles({
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
});

function MobileDrawer({ currentPageName, isLoggedIn }) {
  const history = useHistory();
  const classes = useStyles();

  const { user } = useContext(UserContext);

  const logoutHandler = () => {
    localStorage.setItem("login", JSON.stringify({ login: false }));
    history.push("/login");
  };

  return (
    <div className="site-mobile-menu site-navbar-target">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close">
          <span className="icon-close2 js-menu-toggle">
            <CloseIcon />
          </span>
        </div>
      </div>
      <div className="">
        <nav
          className="site-navigation position-relative text-right"
          role="navigation"
        >
          <List>
            {isLoggedIn && (
              <ListItem sx={{ ml: 12, mb: 2 }}>
                <Avatar
                  alt="PP"
                  className={classes.profilePicture}
                  src={user.profile_picture}
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
              isActiveDrawer={
                currentPageName === "Rooms" ? "drawer-active" : ""
              }
            />
            <NavBarItem
              name="BLOG"
              color="black"
              isActiveDrawer={currentPageName === "Blog" ? "drawer-active" : ""}
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
        </nav>
      </div>
    </div>
  );
}

export default MobileDrawer;
