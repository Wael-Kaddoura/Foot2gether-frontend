import { Grid } from "@mui/material";

function HomeNextMatchCard({ nextMatch }) {
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
                        <img src={nextMatch[0].team1.logo} alt="team1" />
                        <h3>{nextMatch[0].team1.name}</h3>
                      </div>
                      <div>
                        <span className="vs">
                          <span>VS</span>
                        </span>
                      </div>
                      <div className="team-2 text-center">
                        <img src={nextMatch[0].team2.logo} alt="team2" />
                        <h3>{nextMatch[0].team2.name}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center widget-vs-contents mb-4">
                  <h4>{nextMatch[0].competition.name}</h4>
                  <p className="mb-5">
                    <span className="d-block">{nextMatch[0].kick_off}</span>
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
