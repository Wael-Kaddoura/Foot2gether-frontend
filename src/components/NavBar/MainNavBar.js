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
import { useHistory } from "react-router-dom";
import axios from "axios";

function MainNavBar({ currentPageName, NavBarContent }) {
  const history = useHistory();
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
      console.log(my_profile_data);
      setMyProfileData(my_profile_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loginStatusCheck() {
    let login_status = JSON.parse(localStorage.getItem("login"));

    if (login_status.login) {
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
            isLoggedIn={isLoggedIn}
          />

          <DesktopHeader
            currentPageName={currentPageName}
            isLoggedIn={isLoggedIn}
            myProfileData={myProfileData}
          />
        </div>
      )}
      <Overlay NavBarContent={NavBarContent} />
    </div>
  );
}

export default MainNavBar;
