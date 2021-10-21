import team1Img from "../../Images/manchester_city.png";
import team2Img from "../../Images/manchester_united.png";

function HomeMatchCard() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex team-vs">
            <span className="score">1-3</span>
            <div className="team-1 w-50">
              <div className="team-details w-100 text-center">
                <img src={team1Img} alt="team1" className="img-fluid" />
                <h3>Manchester City</h3>
              </div>
            </div>
            <div className="team-2 w-50">
              <div className="team-details w-100 text-center">
                <img src={team2Img} alt="team2" className="img-fluid" />
                <h3>Manchester United</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeMatchCard;
