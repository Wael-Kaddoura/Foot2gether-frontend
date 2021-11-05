import { useState, useEffect } from "react";
import DesktopHeader from "./DesktopHeader";
import Overlay from "./Overlay";
import "../../css/style.css";
import "../../css/bootstrap/bootstrap.css";

function MainNavBar(props) {
  const { currentPageName, children } = props;

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

      <Overlay NavBarContent={children} />
    </div>
  );
}

export default MainNavBar;
