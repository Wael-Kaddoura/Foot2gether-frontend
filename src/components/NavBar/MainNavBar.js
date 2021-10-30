import "../../css/bootstrap/bootstrap.css";

import "../../css/style.css";

import DesktopHeader from "./DesktopHeader";
import Overlay from "./Overlay";

function MainNavBar({ currentPageName, NavBarContent }) {
  let isLoggedIn = false;
  let login_status = JSON.parse(localStorage.getItem("login"));

  if (login_status && login_status.login) {
    isLoggedIn = true;
  }

  return (
    <div>
      <div>
        <DesktopHeader
          currentPageName={currentPageName}
          isLoggedIn={isLoggedIn}
        />
      </div>

      <Overlay NavBarContent={NavBarContent} />
    </div>
  );
}

export default MainNavBar;
