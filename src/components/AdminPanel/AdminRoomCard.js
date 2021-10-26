import { Card, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import date from "date-and-time";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    marginLeft: "auto",
    marginRight: "auto",
  },
  roomName: {
    color: "#000",
    fontSize: 22,
    fontWeight: 700,
    textAlign: "center",
  },
  roomDetailsTitle: {
    color: "#000",
    fontSize: 18,
    fontWeight: 300,
    textAlign: "center",
  },
  roomDetails: {
    color: "#000",
    fontSize: 17,
    fontWeight: 300,
    textAlign: "center",
  },
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxHeight: 38,
      maxWidth: 38,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      minHeight: 50,
      maxHeight: 50,
      maxWidth: 50,
    },
  },
}));

function AdminRoomCard(props) {
  // const {
  //   children,
  //   team1Name,
  //   team1Logo,
  //   team2Name,
  //   team2Logo,
  //   league,
  //   kickOff,
  // } = props;

  const team1Logo = "http://localhost:8000/logos/Manchester_United.png";
  const team2Logo = "http://localhost:8000/logos/Liverpool.png";
  const classes = useStyles();

  //converting kick off time to AM/PM format
  // let kick_off_time = kickOff;
  // if (kick_off_time) {
  //   kick_off_time = date.transform(kick_off_time, "HH:mm:ss", "hh:mm A");
  // }

  return (
    <Grid item xs={12} sx={{ mb: 1 }}>
      <Card
        className={classes.card}
        sx={{ maxWidth: 1140, minHeight: 120, mb: 1, mx: 2 }}
      >
        <Grid
          item
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Grid item xs={4} md={2}>
            <Typography className={classes.roomName}>Room01</Typography>
          </Grid>

          <Grid item xs={3} sm={2} className={classes.vs}>
            <img className={classes.teamLogo} src={team1Logo} alt="team1" />

            <img className={classes.teamLogo} src={team2Logo} alt="team2" />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography className={classes.roomDetailsTitle}>
              Room ID:
            </Typography>
            <Typography className={classes.roomDetails}>23</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography className={classes.roomDetailsTitle}>
              Created By:
            </Typography>
            <Typography className={classes.roomDetails}>
              Khalil.Alameh
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography className={classes.roomDetailsTitle}>
              Current:
            </Typography>
            <Typography className={classes.roomDetails}>6</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default AdminRoomCard;
