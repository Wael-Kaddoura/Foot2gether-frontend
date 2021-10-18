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

function MobileDrawer() {
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
            <NavBarItem name="HOME" color="black" />
            <NavBarItem name="MATCHES" color="black" />
            <NavBarItem name="BLOG" color="black" />
            <NavBarItem name="STANDINGS" color="black" />
          </List>
        </nav>
      </div>
    </div>
  );
}

export default MobileDrawer;
