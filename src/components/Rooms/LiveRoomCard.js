import { Card, Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import team1Img from "../../Images/manchester_city.png";
import team2Img from "../../Images/manchester_united.png";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginLeft: "auto",
    marginRight: "auto",
  },
  roomName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: 700,
    textAlign: "center",
  },
  joinBtn: {
    color: "#fff",
    backgroundColor: "#ee1e46",
    borderColor: "#ee1e46",
    fontSize: 16,
    fontWeight: 700,
  },
  roomDetailsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 300,
    textAlign: "center",
  },
  roomDetails: {
    color: "#fff",
    fontSize: 17,
    fontWeight: 300,
    textAlign: "center",
  },
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      width: 38,
      height: 38,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      width: 50,
      height: 50,
    },
  },
}));

function LiveRoomCard(props) {
  const {} = props;
  const classes = useStyles();

  return (
    <Grid item xs={12} sx={{ mb: 5 }}>
      <Card
        className={classes.card}
        sx={{ maxWidth: 1140, minHeight: 176, maxHeight: 176, mx: 2 }}
      >
        <Grid
          sx={{ minHeight: 176 }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={4} md={2}>
              <Typography className={classes.roomName}>Room01</Typography>
            </Grid>

            <Grid item xs={3} sm={2} className={classes.vs}>
              <img className={classes.teamLogo} src={team1Img} alt="team1" />

              <img className={classes.teamLogo} src={team2Img} alt="team2" />
            </Grid>

            <Grid item xs={3} md={1}>
              <Button
                className={classes.joinBtn}
                variant="outlined"
                color="error"
              >
                Join
              </Button>
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
              <Typography className={classes.roomDetails}>211</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography className={classes.roomDetailsTitle}>
                Created By:
              </Typography>
              <Typography className={classes.roomDetails}>Admin01</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography className={classes.roomDetailsTitle}>
                Current:
              </Typography>
              <Typography className={classes.roomDetails}>25</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default LiveRoomCard;
