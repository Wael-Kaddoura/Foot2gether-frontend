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

function UpcomingMatchCard() {
  const classes = useStyles();

  const Ref = useRef(null);

  const [timer, setTimer] = useState("00:00:00");

  //Getting hours, minutes & seconds from our initial time
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
    //Initial View
    setTimer("01:45:30");

    //Updating Timer variable every 1 second
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    //Specify Countdown in seconds
    deadline.setSeconds(deadline.getSeconds() + 6330);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <MatchCard>
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
