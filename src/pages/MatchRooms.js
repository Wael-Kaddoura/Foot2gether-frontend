import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MainNavBar from "../components/NavBar/MainNavBar";
import LiveRoomCard from "../components/Rooms/LiveRoomCard";

const useStyles = makeStyles((theme) => ({
  roomContainer: {
    padding: 24,
  },
}));

function MatchRooms() {
  const classes = useStyles();

  return (
    <div>
      <MainNavBar />
      <Grid className={classes.roomContainer}>
        <LiveRoomCard />
        <LiveRoomCard />
        <LiveRoomCard />
      </Grid>
    </div>
  );
}

export default MatchRooms;
