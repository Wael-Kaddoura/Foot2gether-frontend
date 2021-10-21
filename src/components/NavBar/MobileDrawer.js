import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import { List } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavBarItem from "./NavBarItem";

function MobileDrawer({ currentPageName }) {
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
          </List>
        </nav>
      </div>
    </div>
  );
}

export default MobileDrawer;
