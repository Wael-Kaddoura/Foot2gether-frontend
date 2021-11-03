import { useTheme, useMediaQuery } from "@material-ui/core";
import { useState } from "react";
import {
  List,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItem,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useHistory } from "react-router-dom";

import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";

import NavBarItem from "./NavBarItem";
import DrawerComponent from "./MobileDrawer";

const useStyles = makeStyles({
  navbarContainer: {
    maxWidth: "1400px !important",
    width: "100% !important",
    paddingRight: "15px !important",
    paddingLeft: "15px !important",
    marginRight: "auto !important",
    marginLeft: "auto !important",
    display: "block !important",
    boxSizing: "border-box !important",
  },
  loginBtn: {
    color: "#fff",
  },
  mainLogo: {
    color: "#fff",
    fontSize: "24px !important",
    fontWeight: "900 !important",
  },
});

function DesktopHeader(props) {
  const { currentPageName, isLoggedIn, setIsLoggedIn } = props;

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

  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const menuId = "primary-search-account-menu";

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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = isLoggedIn ? (
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
      <MenuItem style={{ color: "#ee1e46" }}>{username}</MenuItem>
      <Link to={"/my_profile"} style={{ color: "#212529" }}>
        <MenuItem>My Profile</MenuItem>
      </Link>
      <MenuItem onClick={logoutHandler}>Log out</MenuItem>
    </Menu>
  ) : (
    <div></div>
  );

  return (
    <header className="site-navbar py-4" role="banner">
      <div className={classes.navbarContainer}>
        {isMobile ? (
          <DrawerComponent
            currentPageName={currentPageName}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        ) : (
          <div className="d-flex align-items-center">
            <Box className="site-logo" sx={{ ml: 16 }}>
              <Link to="/">
                <Typography className={classes.mainLogo}>
                  Foot2gether
                </Typography>
              </Link>
            </Box>

            <div className="ml-auto">
              <nav
                className="site-navigation position-relative text-right"
                role="navigation"
              >
                <List className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                  <NavBarItem
                    name="HOME"
                    path=""
                    color="white"
                    isActive={currentPageName === "Home" ? "active" : ""}
                  />
                  <NavBarItem
                    name="MATCHES"
                    path="matches"
                    color="white"
                    isActive={currentPageName === "Matches" ? "active" : ""}
                  />
                  <NavBarItem
                    name="ROOMS"
                    path="rooms"
                    color="white"
                    isActive={currentPageName === "Rooms" ? "active" : ""}
                  />
                  <NavBarItem
                    name="BLOGS"
                    path="blogs"
                    color="white"
                    isActive={currentPageName === "Blogs" ? "active" : ""}
                  />

                  {isLoggedIn ? (
                    <ListItem style={{ width: 60 }} sx={{ mr: 1 }}>
                      <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="primary"
                      >
                        <Avatar alt="PP" src={user_profile_picture} />
                      </IconButton>
                      {renderMenu}
                    </ListItem>
                  ) : (
                    <Link to={"/login"}>
                      <Button
                        className={classes.loginBtn}
                        variant="contained"
                        sx={{ ml: 5 }}
                      >
                        Log in
                      </Button>
                    </Link>
                  )}

                  <ListItem style={{ width: 230 }}>
                    <Link to={"/user_search"}>
                      <Button
                        style={{
                          color: "rgba(0, 0, 0, 0.5)",
                          backgroundColor: "rgba(255, 255, 255, 0.45)",
                          textTransform: "none",
                        }}
                      >
                        Search Users <SearchIcon sx={{ ml: 1 }} />
                      </Button>
                    </Link>
                  </ListItem>
                </List>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default DesktopHeader;
