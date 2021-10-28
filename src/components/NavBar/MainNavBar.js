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

function MainNavBar({ currentPageName, NavBarContent }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false);

  async function loginStatusCheck() {
    let login_status = JSON.parse(localStorage.getItem("login"));

    if (login_status.login) {
      setIsloggedIn(true);

      setIsLoaded(true);
    } else {
      setIsloggedIn(false);
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    loginStatusCheck();
  }, []);

  return (
    <div>
      {isLoaded && (
        <div>
          <MobileDrawer
            currentPageName={currentPageName}
            isLoggedIn={isLoggedIn}
          />

          <DesktopHeader
            currentPageName={currentPageName}
            isLoggedIn={isLoggedIn}
          />
        </div>
      )}
      <Overlay NavBarContent={NavBarContent} />
    </div>
  );
}

export default MainNavBar;
