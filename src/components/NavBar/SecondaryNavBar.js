import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import { useState, useEffect } from "react";

import MobileDrawer from "./MobileDrawer";
import DesktopHeader from "./DesktopHeader";
import SecondaryOverlay from "./SecondaryOverlay";

function MainNavBar({ currentPageName }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false);

  async function loginStatusCheck() {
    let login_status = JSON.parse(localStorage.getItem("login"));

    if (login_status && login_status.login) {
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
          <DesktopHeader
            currentPageName={currentPageName}
            isLoggedIn={isLoggedIn}
          />
        </div>
      )}
      <SecondaryOverlay />
    </div>
  );
}

export default MainNavBar;
