import "../../css/bootstrap/bootstrap.css";
import "../../css/style.css";

import { useState, useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import Overlay from "./Overlay";

function MainNavBar({ currentPageName, NavBarContent }) {
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

      <Overlay NavBarContent={NavBarContent} />
    </div>
  );
}

export default MainNavBar;
