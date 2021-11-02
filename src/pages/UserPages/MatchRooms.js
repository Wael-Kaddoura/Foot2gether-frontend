import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { makeStyles } from "@mui/styles";
import { useLocation, useHistory } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import MainNavBar from "../../components/NavBar/MainNavBar";
import RoomMatchCard from "../../components/Matches/MatchCards/RoomMatchCard";
import LiveMatchRoomCard from "../../components/Rooms/LiveMatchRoomCard";
import NoMatchMsg from "../../components/Matches/NoMatchMsg";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: "50px !important",
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
}));

function MatchRooms() {
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push("/login");
  }

  const classes = useStyles();

  const match_id = new URLSearchParams(useLocation().search).get("id");

  const {
    data: matchData,
    fetchError,
    isPending,
  } = useAxiosFetch("https://foot2gether.ml/match/" + match_id);

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
        xs={8}
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        className={classes.navbarContent}
      >
        {!isPending && <RoomMatchCard matchData={matchData} />}
      </Grid>

      <Grid xs={2} className={classes.navbarContent}>
        <ScrollLink to="liveRooms" spy={false} smooth={true}>
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
      <MainNavBar NavBarContent={NavBarContent} />

      <BackdropComponent open={isPending} />

      {!isPending && (
        <Grid
          id="liveRooms"
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

            {matchData.matchroom.length ? (
              matchData.matchroom.map((room) => (
                <LiveMatchRoomCard
                  key={room.id}
                  roomName={room.name}
                  roomID={room.id}
                  roomCreator={room.creator.username}
                  roomCreatorID={room.creator_id}
                  roomCurrentCapacity={room.current_participants_number}
                />
              ))
            ) : (
              <NoMatchMsg msg="There are no Live Rooms right now!" />
            )}
          </Grid>
        </Grid>
      )}

      <Footer />
    </div>
  );
}

export default MatchRooms;
