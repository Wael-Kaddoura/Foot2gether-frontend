import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
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

  const { team1Name, team1Logo, team2Name, team2Logo, league, kickOff } = props;

  return (
    <MatchCard
      team1Name={team1Name}
      team1Logo={team1Logo}
      team2Name={team2Name}
      team2Logo={team2Logo}
      league={league}
      kickOff={kickOff}
    >
      <Button className={classes.showRoomBtn} variant="outlined" color="error">
        Show Rooms
      </Button>
    </MatchCard>
  );
}

export default LiveMatchCard;
