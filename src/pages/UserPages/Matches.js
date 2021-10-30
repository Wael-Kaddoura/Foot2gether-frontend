import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status && login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }

  const classes = useStyles();

  const [isPending, setIsPending] = useState(true);
  const [liveMatches, setLiveMatches] = useState(null);
  const [upcomingMatches, setUpcomingMatches] = useState(null);
  const [finishedMatches, setFinishedMatches] = useState(null);

  async function getLiveMatches() {
    try {
      let response = await axios.get(
        "http://localhost:8000/match/live",
        config
      );
      let live_matches_data = response.data;
      setLiveMatches(live_matches_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUpcomingMatches() {
    try {
      let response = await axios.get(
        "http://localhost:8000/match/upcoming",
        config
      );
      let upcoming_matches_data = response.data;
      setUpcomingMatches(upcoming_matches_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getFinishedMatches() {
    try {
      let response = await axios.get(
        "http://localhost:8000/match/finished",
        config
      );
      let finished_matches_data = response.data;
      setFinishedMatches(finished_matches_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getLiveMatches();
    await getUpcomingMatches();
    await getFinishedMatches();

    setIsPending(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        <h1 className={classes.pageTitle}>Matches</h1>
        <p className={classes.pageSubTitle}>
          Choose any Match to enjoy watching the game with other fans!
        </p>
      </div>
    </div>
  );
  return (
    <div>
      <MainNavBar currentPageName="Matches" NavBarContent={NavBarContent} />

      <BackdropComponent open={isPending} />

      {!isPending && (
        <MatchesTab
          liveMatches={liveMatches}
          upcomingMatches={upcomingMatches}
          finishedMatches={finishedMatches}
        />
      )}

      <Footer />
    </div>
  );
}

export default Matches;
