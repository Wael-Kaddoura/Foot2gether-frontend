import "../../css/bootstrap/bootstrap.css";

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
