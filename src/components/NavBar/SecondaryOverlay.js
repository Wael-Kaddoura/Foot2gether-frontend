import getAPIBaseURL from "../../APIBaseURL";

function SecondaryOverlay() {
  const overlayBackgroundImage =
    getAPIBaseURL() + "/cover_photo/default_cover_photo.jpg";

  return (
    <div>
      <div
        className="hero-secondary overlay"
        style={{
          backgroundImage: `url(${overlayBackgroundImage})`,
        }}
      ></div>
    </div>
  );
}

export default SecondaryOverlay;
