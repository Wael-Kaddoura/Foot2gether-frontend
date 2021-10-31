import { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import axios from "axios";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import MainNavBar from "../../components/NavBar/MainNavBar";
import RoomSearchBar from "../../components/Rooms/RoomSearchBar";
import LiveRoomCard from "../../components/Rooms/LiveRoomCard";
import CreateNewRoom from "../../components/Rooms/CreateNewRoom";
import NoMatchMsg from "../../components/Matches/NoMatchMsg";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
    color: "#fff",
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
  if (login_status && login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }

  const classes = useStyles();

  const [isPending, setIsPending] = useState(true);
  const [isSearchRoom, setIsSearchRoom] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [liveRooms, setLiveRooms] = useState(null);
  const [liveRoomsCount, setLiveRoomsCount] = useState(null);

  function showAllRooms() {
    setIsSearchRoom(false);
  }

  const { data: userType } = useAxiosFetch("http://localhost:8000/user/type");

  async function searchHandler(room_id) {
    if (room_id == "") {
      setIsSearchRoom(false);
    } else {
      setIsPending(true);
      try {
        let response = await axios.get(
          `http://localhost:8000/room/` + room_id,
          config
        );
        let searched_room_data = response.data;
        setSearchResult(searched_room_data);
        setIsSearchRoom(true);
        setIsPending(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function getLiveRooms() {
    try {
      let response = await axios.get(`http://localhost:8000/room`, config);
      let live_rooms_data = response.data;
      setLiveRooms(live_rooms_data);
      setLiveRoomsCount(live_rooms_data.length);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getLiveRooms();
    setIsPending(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        <h1 className={classes.pageTitle}>Rooms</h1>
        {!isPending && (
          <p className={classes.pageSubTitle}>
            There are currently {liveRoomsCount} Live Rooms!
          </p>
        )}
        <RoomSearchBar searchHandler={searchHandler} />
        <Grid>
          <ScrollLink to="allLiveRooms" spy={false} smooth={true}>
            <Typography>See All Live Rooms</Typography>
            <ArrowDownwardIcon style={{ color: "#fff" }} />
          </ScrollLink>
        </Grid>
      </div>
    </div>
  );

  return (
    <div>
      <MainNavBar currentPageName="Rooms" NavBarContent={NavBarContent} />

      <BackdropComponent open={isPending} />

      {!isPending && (
        <Grid
          id="allLiveRooms"
          container
          className={classes.roomContent}
          direction="row"
          justifyContent="center"
          style={{ backgroundColor: "#1a1e25 " }}
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
                  {userType === 2 ? (
                    <CreateNewRoom getLiveRooms={getLiveRooms} />
                  ) : (
                    ""
                  )}
                </Grid>
              )}
            </Grid>

            {isSearchRoom ? (
              searchResult ? (
                <LiveRoomCard
                  config={config}
                  roomName={searchResult.name}
                  roomID={searchResult.id}
                  roomCreator={searchResult.creator.username}
                  roomCreatorID={searchResult.creator_id}
                  roomCurrentCapacity={searchResult.current_participants_number}
                  team1Logo={searchResult.matchroom.team1.logo}
                  team2Logo={searchResult.matchroom.team2.logo}
                />
              ) : (
                <Grid style={{ height: 200 }}>No Rooms Found</Grid>
              )
            ) : (
              ""
            )}

            {!isSearchRoom &&
              (liveRooms.length ? (
                liveRooms.map((room) => (
                  <LiveRoomCard
                    key={room.id}
                    config={config}
                    roomName={room.name}
                    roomID={room.id}
                    roomCreator={room.creator.username}
                    roomCreatorID={room.creator_id}
                    roomCurrentCapacity={room.current_participants_number}
                    team1Logo={room.matchroom.team1.logo}
                    team2Logo={room.matchroom.team2.logo}
                  />
                ))
              ) : (
                <NoMatchMsg msg="There are no Live Rooms right now!" />
              ))}
          </Grid>
        </Grid>
      )}

      <Footer />
    </div>
  );
}

export default Rooms;
