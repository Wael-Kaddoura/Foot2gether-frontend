import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxWidth: 35,
      maxHeight: 35,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      maxWidth: 50,
      maxHeight: 50,
    },
  },
  vs: {
    textAlign: "center",
    fontWeight: 700,
  },
}));

function CreateNewRoomMenuItem(props) {
  const { team1Logo, team2Logo } = props;

  const classes = useStyles();

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid container item xs={3} sm={4} justifyContent="center">
        <img src={team1Logo} className={classes.teamLogo} alt="team1" />
      </Grid>
      <Grid item xs={2} className={classes.vs}>
        VS
      </Grid>
      <Grid container item xs={3} sm={4} justifyContent="center">
        <img src={team2Logo} className={classes.teamLogo} alt="team2" />
      </Grid>
    </Grid>
  );
}

export default CreateNewRoomMenuItem;
