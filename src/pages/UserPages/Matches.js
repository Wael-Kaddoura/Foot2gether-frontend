import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import getAPIBaseURL from "../../APIBaseURL";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import MainNavBar from "../../components/NavBar/MainNavBar";
import MatchesTab from "../../components/Matches/MatchesTab";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const useStyles = makeStyles({
  navbarContentContainer: {
    height: "100vh !important",
    minHeight: "500px !important",
  },
  navbarContent: {
    position: "relative !important",
    width: "100% !important",
    minHeight: "1px !important",
    paddingRight: "15px !important",
    paddingLeft: "15px !important",
  },
  navbarContentTitle: {
    textAlign: "center !important",
    color: "#fff !important",
    fontSize: "50px !important",
    fontWeight: "700 !important",
  },
  navbarContentSubtitle: {
    fontSize: "16px !important",
    fontWeight: "300 !important",
    color: "rgba(255, 255, 255, 0.7) !important",
    textAlign: "center",
  },
  scrollDown: {
    position: "relative !important",
    width: "100% !important",
    minHeight: "1px !important",
    paddingRight: "15px !important",
    paddingLeft: "15px !important",
    minWidth: "185px !important",
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
    getAPIBaseURL() + "/match/live"
  );

  const { data: upcomingMatches, isPending: isUpcomingPending } = useAxiosFetch(
    getAPIBaseURL() + "/match/upcoming"
  );

  const {
    data: finishedMatches,
    fetchError,
    isPending,
  } = useAxiosFetch(getAPIBaseURL() + "/match/finished");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const NavBarContent = (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      className={classes.navbarContentContainer}
    >
      <Grid
        item
        xs={7}
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        className={classes.navbarContent}
      >
        <Typography className={classes.navbarContentTitle} sx={{ mb: 1 }}>
          Matches
        </Typography>

        <Typography className={classes.navbarContentSubtitle} sx={{ mb: 1 }}>
          Choose any Match to enjoy watching the game with other fans!
        </Typography>
      </Grid>

      <Grid xs={2} className={classes.scrollDown}>
        <ScrollLink to="matchesTab" spy={false} smooth={true}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography>Scroll to Matches</Typography>
            <ArrowDownwardIcon style={{ color: "#fff" }} />
          </Grid>
        </ScrollLink>
      </Grid>
    </Grid>
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
