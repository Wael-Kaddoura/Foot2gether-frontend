import { Card, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import team1 from "../../../Images/real_madrid.png";
import team2 from "../../../Images/manchester_united.png";

const useStyles = makeStyles({
  card: { backgroundColor: "rgba(255, 255, 255, 0.05)" },
  teamSide: { textAlign: "center" },
  teamImage: { minHeight: 120, maxWidth: 100 },
  teamName: { color: "#fff", fontSize: 18, fontWeight: 700 },
  matchDetails: { textAlign: "center" },
  matchLeague: { color: "#EE1E46", fontSize: 16, fontWeight: 700 },
  matchTime: { color: "#808080", fontSize: 16, fontWeight: 300 },
  matchStadium: { color: "#808080", fontSize: 16, fontWeight: 300 },
});

function MatchCard({ children }) {
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
              {children}
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
