import { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import getAPIBaseURL from "../../APIBaseURL";
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
    maxWidth: "1140px !important",
  },
  bodyTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
  },
  roomContent: {
    minWidth: "100%",
  },
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

  const { data: userType, isPending: isUserTypePending } = useAxiosFetch(
    getAPIBaseURL() + "/user/type"
  );

  async function searchHandler(room_id) {
    if (room_id == "") {
      setIsSearchRoom(false);
    } else {
      setIsPending(true);
      try {
        let response = await axios.get(
          getAPIBaseURL() + `/room/` + room_id,
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
      let response = await axios.get(getAPIBaseURL() + `/room`, config);
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
          Rooms
        </Typography>

        {!isPending && (
          <Typography className={classes.navbarContentSubtitle} sx={{ mb: 2 }}>
            There are currently {liveRoomsCount} Live Rooms!
          </Typography>
        )}

        <RoomSearchBar searchHandler={searchHandler} />
      </Grid>

      <Grid xs={2} className={classes.scrollDown}>
        <ScrollLink to="allLiveRooms" spy={false} smooth={true}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography>Scroll to Rooms</Typography>
            <ArrowDownwardIcon style={{ color: "#fff" }} />
          </Grid>
        </ScrollLink>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <MainNavBar currentPageName="Rooms" NavBarContent={NavBarContent} />

      <BackdropComponent open={isPending || isUserTypePending} />

      {!isPending && !isUserTypePending && (
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
                  {userType.user_type_id === 2 ? (
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
                <NoMatchMsg msg="No Live Rooms Found!" />
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
