import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import MobileDrawer from "./MobileDrawer";
import DesktopHeader from "./DesktopHeader";
import Overlay from "./Overlay";

function MainNavBar({ NavBarContent }) {
  return (
    <div>
      <MobileDrawer />

      <DesktopHeader />

      <Overlay NavBarContent={NavBarContent} />
    </div>
  );
}

export default MainNavBar;
