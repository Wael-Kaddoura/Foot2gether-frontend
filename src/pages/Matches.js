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
  const [upcomingMatches, setUpcomingMatches] = useState(null);
  const [finishedMatches, setFinishedMatches] = useState(null);

  async function getLiveMatches() {
    try {
      let response = await axios.get("http://localhost:8000/match/live");
      let live_matches_data = response.data;
      setLiveMatches(live_matches_data);
      console.log(live_matches_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getLiveMatches();
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
      {isLoaded && <MatchesTab liveMatches={liveMatches} />}
    </div>
  );
}

export default Matches;
