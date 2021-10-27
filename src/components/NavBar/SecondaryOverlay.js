function SecondaryOverlay() {
  return (
    <div>
      <div
        className="hero-secondary overlay"
        style={{
          backgroundImage: `url(http://localhost:8000/cover_photo/default_cover_photo.jpg)`,
        }}
      >
        <div className="container">
          <div className="row align-items-center"></div>
        </div>
      </div>
    </div>
  );
}

export default SecondaryOverlay;
