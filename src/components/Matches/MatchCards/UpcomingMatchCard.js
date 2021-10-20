import { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MatchCard from "./MatchCard";

const useStyles = makeStyles({
  upcomingBtn: {
    color: "#fff !important",
    backgroundColor: "grey",
    borderColor: "#ee1e46",
    textTransform: "lowercase",
  },
});

function UpcomingMatchCard(props) {
  const {
    team1Name,
    team1Logo,
    team2Name,
    team2Logo,
    league,
    matchDay,
    kickOff,
  } = props;

  const classes = useStyles();

  const Ref = useRef(null);

  const [timer, setTimer] = useState("--:--:--");

  //Getting hours, minutes & seconds from our time
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor(total / 1000 / 60 / 60);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    //Updating Timer variable every 1 second
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = (kickOff) => {
    //Specify Countdown Deadline
    let deadline = new Date(matchDay + " " + kickOff);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime(kickOff));
  }, []);

  return (
    <MatchCard
      team1Name={team1Name}
      team1Logo={team1Logo}
      team2Name={team2Name}
      team2Logo={team2Logo}
      league={league}
      kickOff={kickOff}
    >
      <Button
        className={classes.upcomingBtn}
        variant="outlined"
        color="error"
        disabled
      >
        {timer}
      </Button>
      ;
    </MatchCard>
  );
}

export default UpcomingMatchCard;
