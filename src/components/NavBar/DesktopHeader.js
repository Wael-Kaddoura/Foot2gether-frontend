import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import MenuIcon from "@mui/icons-material/Menu";

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
              <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                <li className="active">
                  <a href="index.html" className="nav-link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="matches.html" className="nav-link">
                    Matches
                  </a>
                </li>
                <li>
                  <a href="blog.html" className="nav-link">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="contact.html" className="nav-link">
                    Standings
                  </a>
                </li>
              </ul>
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
