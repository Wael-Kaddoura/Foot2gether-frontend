import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CircleIcon from "@mui/icons-material/Circle";

import HomeNextMatchCard from "./HomeNextMatchCard";

const useStyles = makeStyles({
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
  },
  blogsContainer: {
    paddingLeft: "1em",
    maxWidth: "1140px !important",
    minHeight: "500px !important",
  },
});

function HomeBlogs(props) {
  const classes = useStyles();

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

  return (
    <Grid
      item
      xs={12}
      className={classes.blogsContainer}
      container
      alignItems="center"
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 5 }}
      >
        <Grid item xs={12} sx={{ mb: 0 }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.title}
          >
            <CircleIcon style={{ fill: "#ee1e46" }} sx={{ mr: 1 }} />
            Next Match
          </Grid>
        </Grid>

        <HomeNextMatchCard
          team1Name={team1Name}
          team1Logo={team1Logo}
          team2Name={team2Name}
          team2Logo={team2Logo}
          stadium={stadium}
          league={league}
          kickOff={kickOff}
          matchDay={matchDay}
        />
      </Grid>
    </Grid>
  );
}

export default HomeBlogs;
