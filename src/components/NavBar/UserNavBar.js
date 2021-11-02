import "../../css/style.css";
import "../../css/bootstrap/bootstrap.css";

import DesktopHeader from "./DesktopHeader";
import UserOverlay from "./UserOverlay";

function UserNavBar(props) {
  const { currentPageName, NavBarContent, coverPhoto, dontShowProfileIcon } =
    props;

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
          dontShowProfileIcon={dontShowProfileIcon}
          isLoggedIn={isLoggedIn}
        />
      </div>

      <UserOverlay NavBarContent={NavBarContent} coverPhoto={coverPhoto} />
    </div>
  );
}

export default UserNavBar;
