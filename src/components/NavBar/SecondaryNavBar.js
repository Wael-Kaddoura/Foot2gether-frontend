import "../../css/style.css";
import "../../css/bootstrap/bootstrap.css";

import { useState, useEffect } from "react";

import DesktopHeader from "./DesktopHeader";
import SecondaryOverlay from "./SecondaryOverlay";

function MainNavBar({ currentPageName }) {
  let login_status = JSON.parse(localStorage.getItem("login"));

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (login_status && login_status.login) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <div>
        <DesktopHeader
          currentPageName={currentPageName}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>
      <SecondaryOverlay />
    </div>
  );
}

export default MainNavBar;
