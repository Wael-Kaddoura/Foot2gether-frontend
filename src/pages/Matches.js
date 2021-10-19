import { useState, useEffect } from "react";
import MainNavBar from "../components/NavBar/MainNavBar";
import MatchesTab from "../components/Matches/MatchesTab";
import SearchBar from "../components/SearchBar";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
    fontWeight: 700,
  },
});

function Matches() {
  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [liveMatches, setLiveMatches] = useState(null);
  const [liveMatchesCount, setLiveMatchesCount] = useState(null);
  const [upcomingMatches, setUpcomingMatches] = useState(null);
  const [upcomingMatchesCount, setUpcomingMatchesCount] = useState(null);
  const [finishedMatches, setFinishedMatches] = useState(null);
  const [finishedMatchesCount, setFinishedMatchesCount] = useState(null);

  async function getLiveMatches() {
    try {
      let response = await axios.get("http://localhost:8000/match/live");
      let live_matches_data = response.data;
      setLiveMatches(live_matches_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getLiveMatchesCount() {
    try {
      let response = await axios.get("http://localhost:8000/match/live_count");
      let live_matches_count = response.data.live_count;
      setLiveMatchesCount(live_matches_count);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUpcomingMatches() {
    try {
      let response = await axios.get("http://localhost:8000/match/upcoming");
      let upcoming_matches_data = response.data;
      setUpcomingMatches(upcoming_matches_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUpcomingMatchesCount() {
    try {
      let response = await axios.get(
        "http://localhost:8000/match/upcoming_count"
      );
      let upcoming_matches_count = response.data.upcoming_count;
      setUpcomingMatchesCount(upcoming_matches_count);
    } catch (error) {
      console.log(error);
    }
  }

  async function getFinishedMatches() {
    try {
      let response = await axios.get("http://localhost:8000/match/finished");
      let finished_matches_data = response.data;
      setFinishedMatches(finished_matches_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getLiveMatches();
    await getLiveMatchesCount();
    await getUpcomingMatches();
    await getUpcomingMatchesCount();
    await getFinishedMatches();
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        <h1 className={classes.pageTitle}>Matches</h1>
        <p className={classes.pageSubTitle}>
          Choose any Match to enjoy watching the game with other fans!
        </p>
        <SearchBar />
      </div>
    </div>
  );
  return (
    <div>
      <MainNavBar currentPageName="Matches" NavBarContent={NavBarContent} />
      {isLoaded && (
        <MatchesTab
          liveMatches={liveMatches}
          liveMatchesCount={liveMatchesCount}
          upcomingMatches={upcomingMatches}
          upcomingMatchesCount={upcomingMatchesCount}
          finishedMatches={finishedMatches}
        />
      )}
    </div>
  );
}

export default Matches;
