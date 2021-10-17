import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";
import backgroundImage from "../../Images/bg_3.jpg";

function Overlay({ NavBarContent }) {
  return (
    <div
      className="hero overlay"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container">{NavBarContent}</div>
    </div>
  );
}

export default Overlay;
