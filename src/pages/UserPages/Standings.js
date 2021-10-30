import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import { useState } from "react";
import {
  List,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NavBarItem from "../../components/NavBar/NavBarItem";

function Standings({ currentPageName, isLoggedIn }) {
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
      <MenuItem onClick={handleMenuClose}>Name</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <header className="site-navbar py-4" role="banner">
      <div className="container">
        <div className="d-flex align-items-center">
          <div className="site-logo">
            <NavBarItem
              name="HOME"
              color="white"
              isActive={currentPageName === "Home" ? "active" : ""}
            />
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
                  name="BLOG"
                  color="white"
                  isActive={currentPageName === "Blog" ? "active" : ""}
                />

                <NavBarItem
                  name="user_search"
                  color="white"
                  isActive={currentPageName === "Blog" ? "active" : ""}
                />

                {isLoggedIn ? (
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
                      <AccountCircle />
                    </IconButton>
                    {renderMenu}
                  </ListItem>
                ) : (
                  <Link to={"/login"}>
                    <Button variant="outlined" color="success" sx={{ ml: 5 }}>
                      Log in
                    </Button>
                  </Link>
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

export default Standings;
