import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  followInfo: {
    color: "#ee1e46 !important",
    fontWeight: 700,
    fontSize: 23,
    textAlign: "center",
  },
  userBio: {
    color: "#fff",
    fontWeight: 400,
    fontSize: 18,
  },
});

function UserInfo() {
  const classes = useStyles();

  return (
    <div className="hero-tertiary overlay">
      <div className="container">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Typography className={classes.userBio}>
              "United is Life, the rest are more details" - ERIC CANTONA
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ mt: 1 }}>
            <Typography className={classes.followInfo}>Followers</Typography>
            <Typography className={classes.followInfo}>75</Typography>
          </Grid>
          <Grid item xs={2} sx={{ mt: 1 }}>
            <Typography className={classes.followInfo}>Following</Typography>
            <Typography className={classes.followInfo}>28</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default UserInfo;
