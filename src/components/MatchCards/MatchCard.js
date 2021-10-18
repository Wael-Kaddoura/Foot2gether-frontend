import { useState, useRef, useEffect } from "react";
import { Card, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import team1 from "../../Images/real_madrid.png";
import team2 from "../../Images/manchester_united.png";

const useStyles = makeStyles({
  card: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
  teamSide: { textAlign: "center" },
  teamImage: { minHeight: 120, maxWidth: 100 },
  teamName: { color: "#fff", fontSize: 18, fontWeight: 700 },
  matchDetails: { textAlign: "center" },
  matchLeague: { color: "#EE1E46", fontSize: 16, fontWeight: 700 },
  matchTime: { color: "#808080", fontSize: 16, fontWeight: 300 },
  matchStadium: { color: "#808080", fontSize: 16, fontWeight: 300 },
  showRoomBtn: {
    color: "#fff",
    backgroundColor: "#ee1e46",
    borderColor: "#ee1e46",
  },
  upcomingBtn: {
    color: "#fff !important",
    backgroundColor: "grey",
    borderColor: "#ee1e46",
    textTransform: "lowercase",
  },
  finishedScore: {
    color: "#fff",
    fontSize: 40,
    fontWeight: 500,
  },
});

function MatchCard({ live, upcoming, finished }) {
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
    <Card
      className={classes.card}
      sx={{ maxWidth: 1140, minHeight: 278, mb: 5, mx: 2 }}
    >
      <Grid
        sx={{ minHeight: 278 }}
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4} className={classes.teamSide}>
          <img className={classes.teamImage} src={team1} alt="team1" />
          <Typography className={classes.teamName}>Real Madrid</Typography>
        </Grid>

        <Grid item xs={4} className={classes.matchDetails}>
          <Grid
            sx={{ minHeight: 278 }}
            container
            direction="column"
            justifyContent="space-around"
            alignItems="center"
          >
            <Grid item xs={4}>
              <Typography className={classes.matchLeague} sx={{ mb: 1 }}>
                Premiere League
              </Typography>
              <Typography className={classes.matchTime} sx={{ mb: 1 }}>
                04:00 PM
              </Typography>
              <Typography className={classes.matchStadium} sx={{ mb: 1 }}>
                Emirates Stadium
              </Typography>
            </Grid>
            <Grid item xs={4}>
              {live && (
                <Button
                  className={classes.showRoomBtn}
                  variant="outlined"
                  color="error"
                >
                  Show Rooms
                </Button>
              )}

              {upcoming && (
                <Button
                  className={classes.upcomingBtn}
                  variant="outlined"
                  color="error"
                  disabled
                >
                  {timer}
                </Button>
              )}

              {finished && (
                <Typography className={classes.finishedScore}>3 - 1</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4} className={classes.teamSide}>
          <img className={classes.teamImage} src={team2} alt="team2" />
          <Typography className={classes.teamName}>
            Manchester United
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default MatchCard;
