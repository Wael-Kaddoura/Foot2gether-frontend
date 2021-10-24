import backgroundImage from "../../Images/bg_3.jpg";

function SecondaryOverlay() {
  return (
    <div>
      <div
        className="hero-secondary overlay"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="container">
          <div className="row align-items-center"></div>
        </div>
      </div>
    </div>
  );
}

export default SecondaryOverlay;
