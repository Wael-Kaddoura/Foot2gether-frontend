import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import MainNavBar from "../components/NavBar/MainNavBar";
import RoomMatchCard from "../components/Matches/MatchCards/RoomMatchCard";
import LiveMatchRoomCard from "../components/Rooms/LiveMatchRoomCard";
import CircleIcon from "@mui/icons-material/Circle";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: "50px !important",
    fontWeight: 700,
  },
  roomsContainer: {
    maxWidth: 1140,
  },
  bodyTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
  },
  roomContent: {
    minWidth: "100%",
  },
}));

function MatchRooms() {
  const classes = useStyles();

  const match_id = new URLSearchParams(useLocation().search).get("id");

  const [isLoaded, setIsLoaded] = useState(false);
  const [matchData, setMatchData] = useState(null);
  const [liveRooms, setLiveRooms] = useState(null);

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
      let response = await axios.get(
        `http://localhost:8000/room/match/${match_id}`
      );
      let match_rooms_data = response.data;
      setLiveRooms(match_rooms_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getMatchData();
    await getMatchRooms();
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {isLoaded && <MainNavBar NavBarContent={NavBarContent} />}
      {isLoaded && (
        <Grid
          container
          className={classes.roomContent}
          direction="row"
          justifyContent="center"
        >
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={classes.roomsContainer}
            sx={{ mx: 2, mt: 5 }}
          >
            <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              className={classes.bodyTitle}
              sx={{ mb: 5 }}
            >
              <CircleIcon style={{ fill: "#ee1e46" }} sx={{ mr: 1 }} />
              Live Rooms
            </Grid>

            {liveRooms.map((room) => (
              <LiveMatchRoomCard
                roomName={room.name}
                roomID={room.id}
                roomCreator={room.creator.username}
                roomCurrentCapacity={room.current_participants_number}
              />
            ))}
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default MatchRooms;
