import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";

function Overlay({ NavBarContent, coverPhoto }) {
  return (
    <div
      className="hero-user-profile overlay"
      style={{ backgroundImage: `url(${coverPhoto})` }}
    >
      <div className="container">{NavBarContent}</div>
    </div>
  );
}

export default Overlay;
