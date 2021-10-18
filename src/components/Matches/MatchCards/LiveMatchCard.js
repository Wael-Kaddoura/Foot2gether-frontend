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

function LiveMatchCard() {
  const classes = useStyles();

  return (
    <MatchCard>
      <Button className={classes.showRoomBtn} variant="outlined" color="error">
        Show Rooms
      </Button>
    </MatchCard>
  );
}

export default LiveMatchCard;
