import "../../css/style.css";
import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import backgroundImage from "../../Images/bg_3.jpg";

function MainNavBar() {
  return (
    <div>
      <header className="site-navbar py-4" role="banner">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="site-logo">
              <a href="index.html">
                <span className="h1">Foot2gether</span>
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
                    <a href="players.html" className="nav-link">
                      Players
                    </a>
                  </li>
                  <li>
                    <a href="blog.html" className="nav-link">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="contact.html" className="nav-link">
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>

              <a
                href="#"
                className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"
              >
                <span className="icon-menu h3 text-white"></span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div
        className="hero overlay"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 ml-auto">
              <h1 className="text-white">Welcome to Foot2gether</h1>
              <p className="text-center">
                Enjoy watching Football Matches with Fans from around the Globe!
              </p>
              <p className="text-center">
                <a
                  href="matches.html"
                  className="btn btn-primary py-3 px-4 mr-3"
                >
                  View Matches
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNavBar;
