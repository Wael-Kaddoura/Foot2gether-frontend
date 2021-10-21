import MenuItem from "@mui/material/MenuItem";
import team1Img from "../../Images/manchester_city.png";
import team2Img from "../../Images/manchester_united.png";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      width: 35,
      height: 35,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      width: 50,
      height: 50,
    },
  },
  vs: {
    textAlign: "center",
    fontWeight: 700,
  },
}));

function CreateNewRoomMenuItem() {
  const classes = useStyles();

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid container item xs={3} sm={4} justifyContent="center">
        <img src={team1Img} className={classes.teamLogo} alt="team1" />
      </Grid>
      <Grid item xs={2} className={classes.vs}>
        VS
      </Grid>
      <Grid container item xs={3} sm={4} justifyContent="center">
        <img src={team2Img} className={classes.teamLogo} alt="team2" />
      </Grid>
    </Grid>
  );
}

export default CreateNewRoomMenuItem;
