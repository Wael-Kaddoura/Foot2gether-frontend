import "../../css/bootstrap/bootstrap.css";

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
