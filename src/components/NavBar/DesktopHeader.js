import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import { List } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavBarItem from "./NavBarItem";

function Header() {
  return (
    <header className="site-navbar py-4" role="banner">
      <div className="container">
        <div className="d-flex align-items-center">
          <div className="site-logo">
            <a href="index.html">
              <span className="h1 main-logo">Foot2gether</span>
            </a>
          </div>

          <div className="ml-auto">
            <nav
              className="site-navigation position-relative text-right"
              role="navigation"
            >
              <List className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                <NavBarItem name="HOME" color="white" />
                <NavBarItem name="MATCHES" color="white" />
                <NavBarItem name="BLOG" color="white" />
                <NavBarItem name="STANDINGS" color="white" />
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

export default Header;
