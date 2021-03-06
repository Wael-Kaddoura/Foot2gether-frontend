import { useEffect } from "react";
import { Grid } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { makeStyles } from "@mui/styles";
import { useLocation, useHistory } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import MainNavBar from "../../components/NavBar/MainNavBar";
import MatchRoomsNavbarContent from "../../components/Matches/MatchRoomsNavbarContent";
import LiveMatchRoomCard from "../../components/Rooms/LiveMatchRoomCard";
import NoMatchMsg from "../../components/Matches/NoMatchMsg";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const useStyles = makeStyles((theme) => ({
  roomsContainer: {
    maxWidth: "1140px !important",
  },
  bodyTitle: {
    color: "#fff !important",
    fontSize: 20,
    fontWeight: 500,
  },
  roomContent: {
    minWidth: "100%",
  },
}));

function MatchRooms() {
  const classes = useStyles();
  const history = useHistory();

  //check user login status
  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push({
      pathname: "/login",
      state: {
        need_login_first: true,
      },
    });
  }

  const match_id = new URLSearchParams(useLocation().search).get("id");

  const { data: matchData, isPending } = useAxiosFetch(
    getAPIBaseURL() + "/match/" + match_id
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BackdropComponent open={isPending} />

      <MainNavBar>
        {!isPending && <MatchRoomsNavbarContent matchData={matchData} />}
      </MainNavBar>

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
