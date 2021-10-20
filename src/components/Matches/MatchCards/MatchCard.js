import { Card, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginLeft: "auto",
    marginRight: "auto",
  },
  teamSide: { textAlign: "center" },
  teamName: { color: "#fff", fontSize: 18, fontWeight: 700 },
  matchDetails: { textAlign: "center" },
  matchLeague: { color: "#fff", fontSize: 20, fontWeight: 700 },
  matchTime: { color: "#808080", fontSize: 17, fontWeight: 300 },
  matchStadium: { color: "#808080", fontSize: 17, fontWeight: 300 },
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxHeight: 90,
      maxWidth: 90,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      Height: 120,
      maxWidth: 120,
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
    league,
    kickOff,
  } = props;
  const classes = useStyles();

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
                {kickOff}
              </Typography>
              <Typography className={classes.matchStadium} sx={{ mb: 1 }}>
                Emirates Stadium
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
