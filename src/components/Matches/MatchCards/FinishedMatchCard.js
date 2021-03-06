import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MatchCard from "./MatchCard";

const useStyles = makeStyles({
  finishedScore: {
    color: "#fff !important",
    fontSize: "40px !important",
    fontWeight: 500,
  },
});

function FinishedMatchCard(props) {
  const {
    team1Name,
    team1Logo,
    team1Score,
    team2Name,
    team2Logo,
    team2Score,
    stadium,
    league,
  } = props;

  const classes = useStyles();

  return (
    <MatchCard
      team1Name={team1Name}
      team1Logo={team1Logo}
      team2Name={team2Name}
      team2Logo={team2Logo}
      stadium={stadium}
      league={league}
    >
      <Typography className={classes.finishedScore}>
        {team1Score} - {team2Score}
      </Typography>
    </MatchCard>
  );
}

export default FinishedMatchCard;
