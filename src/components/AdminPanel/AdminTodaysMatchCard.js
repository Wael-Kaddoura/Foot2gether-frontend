import { Card, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import date from "date-and-time";
import AdminChangeScore from "../../components/AdminPanel/AdminChangeScore";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.05) !important",
    marginLeft: "auto !important",
    marginRight: "auto !important",
    border: "none !important",
  },
  teamSide: { textAlign: "center" },
  teamName: {
    color: "#000",
    fontSize: "18px !important",
    fontWeight: "700 !important",
  },
  matchDetails: { textAlign: "center" },
  matchLeague: {
    color: "#000",
    fontSize: "20px !important",
    fontWeight: "700 !important",
  },
  matchTime: {
    color: "#808080",
    fontSize: "17px !important",
    fontWeight: "700 !important",
  },
  matchStadium: {
    color: "#808080",
    fontSize: "17px !important",
    fontWeight: "700 !important",
  },
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxHeight: 60,
      maxWidth: 60,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      minHeight: 75,
      maxHeight: 75,
      maxWidth: 75,
    },
  },
  finishedScore: {
    color: "#000",
    fontSize: "40px !important",
    fontWeight: "500 !important",
  },
}));

function AdminTodaysMatchCard(props) {
  const {
    config,
    matchID,
    team1,
    team1Logo,
    team1Score,
    team2,
    team2Logo,
    team2Score,
    competition,
    kickOff,
    getTodaysMatches,
    setIsPending,
  } = props;

  const classes = useStyles();

  // converting kick off time to AM/PM format
  let kick_off_time = kickOff;
  if (kick_off_time) {
    kick_off_time = date.transform(kick_off_time, "HH:mm:ss", "hh:mm A");
  }

  return (
    <Grid item xs={12} sx={{ mb: 1 }}>
      <Card
        className={classes.card}
        sx={{ maxWidth: 1140, minHeight: 180, mb: 2, mx: 2, pb: 2 }}
      >
        <Grid
          sx={{ minHeight: 180 }}
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4} className={classes.teamSide}>
            <img className={classes.teamLogo} src={team1Logo} alt="team1" />
            <Typography className={classes.teamName}>{team1}</Typography>
          </Grid>

          <Grid item xs={4} className={classes.matchDetails}>
            <Grid
              sx={{ minHeight: 180 }}
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography className={classes.matchLeague} sx={{ mb: 1 }}>
                  {competition}
                </Typography>
                <Typography className={classes.matchTime}>
                  {kick_off_time}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography className={classes.finishedScore}>
                  {team1Score} - {team2Score}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <AdminChangeScore
                  config={config}
                  matchID={matchID}
                  team1Logo={team1Logo}
                  team2Logo={team2Logo}
                  team1OldScore={team1Score}
                  team2OldScore={team2Score}
                  getTodaysMatches={getTodaysMatches}
                  setIsPending={setIsPending}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} className={classes.teamSide}>
            <img className={classes.teamLogo} src={team2Logo} alt="team2" />
            <Typography className={classes.teamName}>{team2}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default AdminTodaysMatchCard;
