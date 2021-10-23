import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import { useState, useEffect } from "react";
import MobileDrawer from "./MobileDrawer";
import DesktopHeader from "./DesktopHeader";
import Overlay from "./Overlay";
import { useHistory } from "react-router-dom";

function MainNavBar({ currentPageName, NavBarContent }) {
  const history = useHistory();

  const [isLoggedIn, setIsloggedIn] = useState(false);

  function loginStatusCheck() {
    let login_status = JSON.parse(localStorage.getItem("login"));
    if (login_status.login) {
      setIsloggedIn(true);
    } else {
      setIsloggedIn(false);
    }
  }

  useEffect(() => {
    loginStatusCheck();
  }, []);

  return (
    <div>
      <MobileDrawer currentPageName={currentPageName} />

      <DesktopHeader
        currentPageName={currentPageName}
        isLoggedIn={isLoggedIn}
      />

      <Overlay NavBarContent={NavBarContent} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default MainNavBar;
