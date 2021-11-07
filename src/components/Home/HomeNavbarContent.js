import { Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  viewMatchesBtn: {
    color: "#fff !important",
    backgroundColor: "#ee1e46 !important",
    borderColor: "#ee1e46 !important",
    width: "150px !important",
    height: "55px !important",
  },
  navbarContentContainer: {
    height: "100vh !important",
    minHeight: "500px !important",
  },
  navbarContent: {
    marginLeft: "auto !important",
    position: "relative !important",
    width: "100% !important",
    minHeight: "1px !important",
    paddingRight: "15px !important",
    paddingLeft: "15px !important",
  },
  navbarContentTitle: {
    textAlign: "center !important",
    color: "#fff !important",
    fontSize: "32px !important",
    fontWeight: "700 !important",
  },
  navbarContentSubtitle: {
    fontSize: "16px !important",
    fontWeight: "300 !important",
    color: "rgba(255, 255, 255, 0.7) !important",
    textAlign: "center",
  },
});

function HomeNavbarContent() {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      className={classes.navbarContentContainer}
    >
      <Grid item xs={12} lg={5} className={classes.navbarContent}>
        <Typography className={classes.navbarContentTitle} sx={{ mb: 1 }}>
          Welcome to Foot2gether
        </Typography>

        <Typography className={classes.navbarContentSubtitle} sx={{ mb: 1 }}>
          Enjoy watching football matches with fans from around the globe!
        </Typography>

        <Grid container justifyContent="center">
          <Link to="/matches">
            <Button
              className={classes.viewMatchesBtn}
              variant="contained"
              color="error"
            >
              View Matches
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomeNavbarContent;
