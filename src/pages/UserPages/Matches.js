import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import MainNavBar from "../../components/NavBar/MainNavBar";
import MatchesTab from "../../components/Matches/MatchesTab";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
    color: "#fff",
    fontWeight: 700,
  },
});

function Matches() {
  const classes = useStyles();
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push("/login");
  }

  const { data: liveMatches, isPending: isLivePending } = useAxiosFetch(
    "http://localhost:8000/match/live"
  );

  const { data: upcomingMatches, isPending: isUpcomingPending } = useAxiosFetch(
    "http://localhost:8000/match/upcoming"
  );

  const {
    data: finishedMatches,
    fetchError,
    isPending,
  } = useAxiosFetch("http://localhost:8000/match/finished");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        <h1 className={classes.pageTitle}>Matches</h1>
        <p className={classes.pageSubTitle}>
          Choose any Match to enjoy watching the game with other fans!
        </p>
        <Grid>
          <ScrollLink to="matchesTab" spy={false} smooth={true}>
            <Typography>Scroll to Matches</Typography>
            <ArrowDownwardIcon style={{ color: "#fff" }} />
          </ScrollLink>
        </Grid>
      </div>
    </div>
  );
  return (
    <div>
      <MainNavBar currentPageName="Matches" NavBarContent={NavBarContent} />

      <BackdropComponent
        open={isPending || isLivePending || isUpcomingPending}
      />

      {!isPending && !isLivePending && !isUpcomingPending && (
        <div id="matchesTab">
          <MatchesTab
            liveMatches={liveMatches}
            upcomingMatches={upcomingMatches}
            finishedMatches={finishedMatches}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Matches;
