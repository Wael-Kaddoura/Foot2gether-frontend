import "../../css/style.css";
import "../../css/bootstrap/bootstrap.css";

import { useState, useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import UserOverlay from "./UserOverlay";

function UserNavBar(props) {
  const { currentPageName, coverPhoto, dontShowProfileIcon, children } = props;

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
          dontShowProfileIcon={dontShowProfileIcon}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </div>

      <UserOverlay NavBarContent={children} coverPhoto={coverPhoto} />
    </div>
  );
}

export default UserNavBar;
