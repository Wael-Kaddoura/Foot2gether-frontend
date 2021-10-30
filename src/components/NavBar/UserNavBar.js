import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";

import MobileDrawer from "./MobileDrawer";
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
        <MobileDrawer
          currentPageName={currentPageName}
          isLoggedIn={isLoggedIn}
        />
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
