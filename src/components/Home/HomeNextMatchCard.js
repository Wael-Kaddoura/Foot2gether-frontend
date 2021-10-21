import { Grid } from "@mui/material";
import team1Img from "../../Images/manchester_city.png";
import team2Img from "../../Images/manchester_united.png";

function HomeNextMatchCard() {
  return (
    <Grid item xs={12}>
      <div className="site-section bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="widget-next-match">
                <div className="widget-title">
                  <h3>Next Match</h3>
                </div>

                <div className="widget-body mb-3">
                  <div className="widget-vs">
                    <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                      <div className="team-1 text-center">
                        <img src={team1Img} alt="team1" />
                        <h3>Tottenham</h3>
                      </div>
                      <div>
                        <span className="vs">
                          <span>VS</span>
                        </span>
                      </div>
                      <div className="team-2 text-center">
                        <img src={team2Img} alt="team2" />
                        <h3>Chelsea</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center widget-vs-contents mb-4">
                  <h4>Premiere League</h4>
                  <p className="mb-5">
                    <span className="d-block">6:00 PM</span>
                    <strong className="text-primary">
                      Tottenham Hotspur Staduim
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default HomeNextMatchCard;
