import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import MainNavBar from "../components/NavBar/MainNavBar";
import RoomMatchCard from "../components/Matches/MatchCards/RoomMatchCard";
import LiveRoomCard from "../components/Rooms/LiveMatchRoomCard";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  roomContainer: {
    padding: 24,
  },
}));

function MatchRooms() {
  const classes = useStyles();

  const match_id = new URLSearchParams(useLocation().search).get("id");

  const [isLoaded, setIsLoaded] = useState(false);
  const [matchData, setMatchData] = useState(null);

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-7 mx-auto text-center">
        <RoomMatchCard matchData={matchData} />
      </div>
    </div>
  );

  async function getMatchData() {
    try {
      let response = await axios.get("http://localhost:8000/match/" + match_id);
      let match_data = response.data;
      setMatchData(match_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getMatchRooms() {
    try {
      let config = {
        data: { match_id: 2 },
      };
      let response = await axios.get(
        "http://localhost:8000/room/match",
        config
      );
      let match_rooms_data = response.data;
      setMatchData(match_rooms_data);
      console.log(match_rooms_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getMatchData();
    // await getMatchRooms();
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoaded && <MainNavBar NavBarContent={NavBarContent} />}
      {isLoaded && (
        <Grid className={classes.roomContainer} sx={{ mt: 5 }}>
          <LiveRoomCard />
          <LiveRoomCard />
          <LiveRoomCard />
        </Grid>
      )}
    </div>
  );
}

export default MatchRooms;
