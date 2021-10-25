import { Button, LinearProgress, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

import MatchCard from "./MatchCard";

const useStyles = makeStyles({
  showRoomBtn: {
    color: "#fff",
    backgroundColor: "#ee1e46",
    borderColor: "#ee1e46",
  },
});

function LiveMatchCard(props) {
  const classes = useStyles();

  const {
    matchID,
    team1Name,
    team1Logo,
    team2Name,
    team2Logo,
    league,
    kickOff,
  } = props;

  return (
    <MatchCard
      team1Name={team1Name}
      team1Logo={team1Logo}
      team2Name={team2Name}
      team2Logo={team2Logo}
      league={league}
      kickOff={kickOff}
    >
      <Grid
        sx={{ mb: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={5}>
          <LinearProgress color="error" />
        </Grid>
      </Grid>
      <Link to={"/match/rooms?id=" + matchID}>
        <Button
          className={classes.showRoomBtn}
          variant="outlined"
          color="error"
        >
          Show Rooms
        </Button>
      </Link>
    </MatchCard>
  );
}

export default LiveMatchCard;
