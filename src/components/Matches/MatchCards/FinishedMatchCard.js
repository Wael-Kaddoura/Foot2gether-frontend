import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MatchCard from "./MatchCard";

const useStyles = makeStyles({
  finishedScore: {
    color: "#fff",
    fontSize: 40,
    fontWeight: 500,
  },
});

function FinishedMatchCard() {
  const classes = useStyles();

  return (
    <MatchCard>
      <Typography className={classes.finishedScore}>3 - 1</Typography>;
    </MatchCard>
  );
}

export default FinishedMatchCard;
