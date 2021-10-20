import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import backgroundImage from "../../Images/united_fan.jpg";

function Overlay({ NavBarContent }) {
  return (
    <div
      className="hero-user-profile overlay"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">{NavBarContent}</div>
    </div>
  );
}

export default Overlay;
