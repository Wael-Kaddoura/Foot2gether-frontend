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
  Box,
  ListItem,
  Avatar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import NavBarItem from "./NavBarItem";

const useStyles = makeStyles({
  loginBtn: {
    color: "#fff",
    backgroundColor: "#2e7d32",
    borderColor: "#2e7d32",
  },
  mainLogo: {
    fontSize: 24,
    fontWeight: 900,
  },
});

function DesktopHeader(props) {
  const { currentPageName, isLoggedIn, dontShowProfileIcon } = props;

  const { user } = useContext(UserContext);

  const token = JSON.parse(localStorage.getItem("login")).token;
  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const history = useHistory();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const menuId = "primary-search-account-menu";

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
    localStorage.setItem("login", JSON.stringify({ login: false }));
    clearNotificationToken();
    history.push("/login");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = !dontShowProfileIcon ? (
    isLoggedIn ? (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        sx={{ mt: 6.5, ml: 6.25 }}
      >
        <MenuItem style={{ color: "#ee1e46" }}>{user.username}</MenuItem>
        <Link to={"/my_profile"} style={{ color: "#212529" }}>
          <MenuItem>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={logoutHandler}>Log out</MenuItem>
      </Menu>
    ) : (
      <div></div>
    )
  ) : (
    <div></div>
  );

  return (
    <header className="site-navbar py-4" role="banner">
      <div className="container">
        <div className="d-flex align-items-center">
          <div className="site-logo">
            <Link to="/home">
              <Typography className={classes.mainLogo}>Foot2gether</Typography>
            </Link>
          </div>

          <div className="ml-auto">
            <nav
              className="site-navigation position-relative text-right"
              role="navigation"
            >
              <List className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                <NavBarItem
                  name="HOME"
                  color="white"
                  isActive={currentPageName === "Home" ? "active" : ""}
                />
                <NavBarItem
                  name="MATCHES"
                  color="white"
                  isActive={currentPageName === "Matches" ? "active" : ""}
                />
                <NavBarItem
                  name="ROOMS"
                  color="white"
                  isActive={currentPageName === "Rooms" ? "active" : ""}
                />
                <NavBarItem
                  name="BLOGS"
                  color="white"
                  isActive={currentPageName === "Blogs" ? "active" : ""}
                />

                {!dontShowProfileIcon ? (
                  isLoggedIn ? (
                    <ListItem style={{ width: 100 }} sx={{ ml: 5 }}>
                      <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="primary"
                      >
                        <Avatar alt="PP" src={user.profile_picture} />
                      </IconButton>
                      {renderMenu}
                    </ListItem>
                  ) : (
                    <Link to={"/login"}>
                      <Button
                        className={classes.loginBtn}
                        variant="outlined"
                        color="success"
                        sx={{ ml: 5 }}
                      >
                        Log in
                      </Button>
                    </Link>
                  )
                ) : (
                  <div> </div>
                )}
              </List>
            </nav>

            <a
              href="#"
              className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"
            >
              <span className="icon-menu h3 text-white">
                <MenuIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DesktopHeader;
