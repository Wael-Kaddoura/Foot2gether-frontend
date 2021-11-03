import getAPIBaseURL from "../../APIBaseURL";

function SecondaryOverlay() {
  return (
    <div>
      <div
        className="hero-secondary overlay"
        style={{
          backgroundImage:
            "url(" + getAPIBaseURL() + "/cover_photo/default_cover_photo.jpg)",
        }}
      ></div>
    </div>
  );
}

export default SecondaryOverlay;
