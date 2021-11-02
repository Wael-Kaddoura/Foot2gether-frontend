import { useState, useRef, useEffect } from "react";
import { Card, Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import date from "date-and-time";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.07) !important",
    marginLeft: "auto !important",
    marginRight: "auto !important",
    [theme.breakpoints.between("sm", "xl")]: {
      minWidth: "850px !important",
    },
  },
  teamSide: { textAlign: "center" },
  teamName: {
    color: "#fff",
    fontSize: "18px !important",
    fontWeight: "700 !important",
  },
  matchDetails: { textAlign: "center" },
  matchLeague: {
    color: "#fff",
    fontSize: "20px !important",
    fontWeight: "700 !important",
  },
  matchTime: {
    color: "#808080",
    fontSize: "17px !important",
    fontWeight: "300 !important",
  },
  matchStadium: {
    color: "#808080",
    fontSize: "17px !important",
    fontWeight: "300 !important",
  },
  upcomingBtn: {
    color: "#fff !important",
    backgroundColor: "grey !important",
  },
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxHeight: 90,
      maxWidth: 90,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      minHeight: 120,
      maxHeight: 120,
      maxWidth: 120,
    },
  },
}));

function MatchCard(props) {
  const {
    team1Name,
    team1Logo,
    team2Name,
    team2Logo,
    stadium,
    league,
    kickOff,
    matchDay,
  } = props;

  const classes = useStyles();

  //converting kick off time to AM/PM format
  let kick_off_time = kickOff;
  if (kick_off_time) {
    kick_off_time = date.transform(kick_off_time, "HH:mm:ss", "hh:mm A");
  }

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
    <Card
      className={classes.card}
      sx={{ maxWidth: 2000, minHeight: 350, my: 5, mx: 2 }}
    >
      <Grid
        sx={{ minHeight: 350 }}
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4} className={classes.teamSide}>
          <img className={classes.teamLogo} src={team1Logo} alt="team1" />
          <Typography className={classes.teamName}>{team1Name}</Typography>
        </Grid>

        <Grid item xs={4} className={classes.matchDetails}>
          <Grid
            sx={{ minHeight: 350 }}
            container
            direction="column"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography className={classes.matchLeague} sx={{ mb: 1 }}>
                {league}
              </Typography>
              <Typography className={classes.matchTime} sx={{ mb: 1 }}>
                {kick_off_time}
              </Typography>
              <Typography className={classes.matchStadium} sx={{ mb: 1 }}>
                {stadium}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                className={classes.upcomingBtn}
                variant="outlined"
                color="error"
                disabled
              >
                {timer}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4} className={classes.teamSide}>
          <img className={classes.teamLogo} src={team2Logo} alt="team2" />
          <Typography className={classes.teamName}>{team2Name}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default MatchCard;
