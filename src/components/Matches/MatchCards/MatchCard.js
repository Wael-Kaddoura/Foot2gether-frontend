import { Card, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import date from "date-and-time";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.07) !important",
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  teamSide: { textAlign: "center" },
  teamName: {
    color: "#fff !important",
    fontSize: "18px !important",
    fontWeight: "700 !important",
  },
  matchDetails: { textAlign: "center" },
  matchLeague: {
    color: "#fff !important",
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
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxHeight: "90px !important",
      maxWidth: "90px !important",
    },
    [theme.breakpoints.between("sm", "xl")]: {
      minHeight: "120px !important",
      maxHeight: "120px !important",
      maxWidth: "120px !important",
    },
  },
}));

function MatchCard(props) {
  const {
    children,
    team1Name,
    team1Logo,
    team2Name,
    team2Logo,
    stadium,
    league,
    kickOff,
  } = props;

  const classes = useStyles();

  //converting kick off time to AM/PM format
  let kick_off_time = kickOff;
  if (kick_off_time) {
    kick_off_time = date.transform(kick_off_time, "HH:mm:ss", "hh:mm A");
  }

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
          <img className={classes.teamLogo} src={team1Logo} alt="team1" />
          <Typography className={classes.teamName}>{team1Name}</Typography>
        </Grid>

        <Grid item xs={4} className={classes.matchDetails}>
          <Grid
            sx={{ minHeight: 278 }}
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
              {children}
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
