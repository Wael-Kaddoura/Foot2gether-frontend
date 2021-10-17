import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import CloseIcon from "@mui/icons-material/Close";

function Overlay() {
  return (
    <div class="site-mobile-menu site-navbar-target">
      <div class="site-mobile-menu-header">
        <div class="site-mobile-menu-close">
          <span class="icon-close2 js-menu-toggle">
            <CloseIcon />
          </span>
        </div>
      </div>
      <div class="site-mobile-menu-body"></div>
    </div>
  );
}

export default Overlay;
