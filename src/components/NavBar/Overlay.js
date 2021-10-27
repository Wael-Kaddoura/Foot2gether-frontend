import "../../css/bootstrap/bootstrap.css";
import "../../css/owl.carousel.min.css";
import "../../css/owl.theme.default.min.css";
import "../../css/jquery-ui.css";
import "../../css/jquery.fancybox.min.css";
import "../../css/bootstrap-datepicker.css";
import "../../css/aos.css";
import "../../css/style.css";

function Overlay({ NavBarContent }) {
  return (
    <div
      className="hero overlay"
      style={{
        backgroundImage: `url(http://localhost:8000/cover_photo/default_cover_photo.jpg)`,
      }}
    >
      <div className="container">{NavBarContent}</div>
    </div>
  );
}

export default Overlay;
