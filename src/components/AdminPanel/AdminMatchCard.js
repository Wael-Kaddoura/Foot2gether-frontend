import { Card, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import date from "date-and-time";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    marginLeft: "auto",
    marginRight: "auto",
  },
  teamSide: { textAlign: "center" },
  teamName: { color: "#000", fontSize: 18, fontWeight: 700 },
  matchDetails: { textAlign: "center" },
  matchLeague: { color: "#000", fontSize: 20, fontWeight: 700 },
  matchTime: { color: "#808080", fontSize: 17, fontWeight: 700 },
  matchStadium: { color: "#808080", fontSize: 17, fontWeight: 700 },
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxHeight: 60,
      maxWidth: 60,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      minHeight: 60,
      maxHeight: 60,
      maxWidth: 60,
    },
  },
}));

function AdminMatchCard(props) {
  const {
    matchDay,
    kickOff,
    competition,
    stadium,
    team1,
    team1Logo,
    team2,
    team2Logo,
  } = props;

  const classes = useStyles();

  //extracting and formating match date
  let match_date = date.parse(matchDay + " " + kickOff, "YYYY-MM-DD HH:mm:ss");
  match_date = date.format(match_date, "DD MMM YYYY hh:mm A");

  return (
    <Grid item xs={12} sx={{ mb: 1 }}>
      <Card
        className={classes.card}
        sx={{ maxWidth: 1140, minHeight: 120, mb: 1, mx: 2 }}
      >
        <Grid
          sx={{ minHeight: 120 }}
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4} className={classes.teamSide}>
            <img className={classes.teamLogo} src={team1Logo} alt="team1" />
            <Typography className={classes.teamName}>{team1} </Typography>
          </Grid>

          <Grid item xs={4} className={classes.matchDetails}>
            <Grid
              sx={{ minHeight: 120 }}
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item xs={4}>
                <Typography className={classes.matchLeague} sx={{ mb: 1 }}>
                  {competition}
                </Typography>
                <Typography className={classes.matchTime} sx={{ mb: 1 }}>
                  {match_date}
                </Typography>
                <Typography className={classes.matchStadium} sx={{ mb: 1 }}>
                  {stadium}
                </Typography>
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

export default AdminMatchCard;
