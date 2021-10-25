import { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";

import MainNavBar from "../components/NavBar/MainNavBar";
import RoomSearchBar from "../components/Rooms/RoomSearchBar";
import LiveRoomCard from "../components/Rooms/LiveRoomCard";
import CreateNewRoom from "../components/Rooms/CreateNewRoom";

const useStyles = makeStyles({
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
});

function Rooms() {
  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }

  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isSearchRoom, setIsSearchRoom] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [liveRooms, setLiveRooms] = useState(null);
  const [liveRoomsCount, setLiveRoomsCount] = useState(null);

  function showAllRooms() {
    setIsSearchRoom(false);
  }

  async function searchHandler(room_id) {
    try {
      let response = await axios.get(
        `http://localhost:8000/room/` + room_id,
        config
      );
      let searched_room_data = response.data;
      setSearchResult(searched_room_data);
      setIsSearchRoom(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function getLiveRooms() {
    try {
      let response = await axios.get(`http://localhost:8000/room`, config);
      let live_rooms_data = response.data;
      setLiveRooms(live_rooms_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getLiveRoomsCount() {
    try {
      let response = await axios.get(
        `http://localhost:8000/room/count`,
        config
      );
      let live_rooms_count = response.data.live_rooms_count;
      setLiveRoomsCount(live_rooms_count);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getLiveRooms();
    await getLiveRoomsCount();
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        <h1 className={classes.pageTitle}>Rooms</h1>
        <p className={classes.pageSubTitle}>
          There are currently {liveRoomsCount} Live Rooms!
        </p>
        <RoomSearchBar searchHandler={searchHandler} />
      </div>
    </div>
  );

  return (
    <div>
      {isLoaded && (
        <div>
          <MainNavBar currentPageName="Rooms" NavBarContent={NavBarContent} />

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
              <Grid item xs={12} container sx={{ mb: 5 }}>
                <Grid
                  item
                  xs={7}
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.bodyTitle}
                >
                  <CircleIcon style={{ fill: "#ee1e46" }} sx={{ mr: 1 }} />
                  Live Rooms
                </Grid>

                {isSearchRoom ? (
                  <Grid item xs={5} style={{ textAlign: "right" }}>
                    <Button variant="contained" onClick={showAllRooms}>
                      Show All Rooms
                    </Button>
                  </Grid>
                ) : (
                  <Grid item xs={5} style={{ textAlign: "right" }}>
                    <CreateNewRoom />
                  </Grid>
                )}
              </Grid>

              {isSearchRoom ? (
                searchResult ? (
                  <LiveRoomCard
                    roomName={searchResult.name}
                    roomID={searchResult.id}
                    roomCreator={searchResult.creator.username}
                    roomCreatorID={searchResult.creator_id}
                    roomCurrentCapacity={
                      searchResult.current_participants_number
                    }
                    team1ID={searchResult.matchroom.team1_id}
                    team2ID={searchResult.matchroom.team2_id}
                  />
                ) : (
                  <Grid style={{ height: 200 }}>No Rooms Found</Grid>
                )
              ) : (
                ""
              )}

              {!isSearchRoom &&
                liveRooms.map((room) => (
                  <LiveRoomCard
                    roomName={room.name}
                    roomID={room.id}
                    roomCreator={room.creator.username}
                    roomCreatorID={room.creator_id}
                    roomCurrentCapacity={room.current_participants_number}
                    team1ID={room.matchroom.team1_id}
                    team2ID={room.matchroom.team2_id}
                  />
                ))}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Rooms;
