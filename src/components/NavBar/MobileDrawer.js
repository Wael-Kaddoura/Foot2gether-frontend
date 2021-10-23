import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import {
  List,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NavBarItem from "./NavBarItem";

const useStyles = makeStyles({
  loginBtn: {
    color: "#fff",
    backgroundColor: "#2e7d32",
    borderColor: "#2e7d32",
  },
});

function MobileDrawer({ currentPageName, isLoggedIn }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const menuId = "primary-search-account-menu";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
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
      sx={{ mt: 3, ml: 5 }}
    >
      <MenuItem style={{ color: "red !important" }}>Name</MenuItem>
      <MenuItem style={{ color: "red !important" }}>My Profile</MenuItem>
      <MenuItem style={{ color: "red !important" }}>Logout</MenuItem>
    </Menu>
  );

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
                  to="/userprofile"
                  className="nav-link"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem button>
                    <ListItemText primary="PROFILE" />
                  </ListItem>
                </Link>

                <Link
                  to="/userprofile"
                  className="nav-link"
                  style={{ textDecoration: "none", color: "red" }}
                >
                  <ListItem button>
                    <ListItemText primary="LOG OUT" />
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
