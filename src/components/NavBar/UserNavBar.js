import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import { useState, useEffect } from "react";
import axios from "axios";

import MobileDrawer from "./MobileDrawer";
import DesktopHeader from "./DesktopHeader";
import UserOverlay from "./UserOverlay";

function UserNavBar(props) {
  const { currentPageName, NavBarContent, coverPhoto, dontShowProfileIcon } =
    props;

  let config = {};

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [myProfileData, setMyProfileData] = useState(null);

  async function getMyProfileData() {
    try {
      let response = await axios.get(
        `http://localhost:8000/user/my_profile`,
        config
      );
      let my_profile_data = response.data;
      setMyProfileData(my_profile_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loginStatusCheck() {
    let login_status = JSON.parse(localStorage.getItem("login"));

    if (login_status && login_status.login) {
      setIsloggedIn(true);

      const token = login_status.token;
      config = { headers: { Authorization: `Bearer ${token}` } };

      await getMyProfileData();
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
            myProfileData={myProfileData}
            isLoggedIn={isLoggedIn}
          />
          <DesktopHeader
            currentPageName={currentPageName}
            dontShowProfileIcon={dontShowProfileIcon}
            myProfileData={myProfileData}
            isLoggedIn={isLoggedIn}
          />
        </div>
      )}
      <UserOverlay NavBarContent={NavBarContent} coverPhoto={coverPhoto} />
    </div>
  );
}

export default UserNavBar;
