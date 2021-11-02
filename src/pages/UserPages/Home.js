import { useEffect } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import MainNavBar from "../../components/NavBar/MainNavBar";
import HomeNextMatchCard from "../../components/Home/HomeNextMatchCard";
import NoMatchMsg from "../../components/Matches/NoMatchMsg";
import HomeBlogs from "../../components/Home/HomeBlogs";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const useStyles = makeStyles({
  viewMatchesBtn: {
    color: "#fff",
    backgroundColor: "#ee1e46 !important",
    borderColor: "#ee1e46 !important",
    width: 150,
    height: 55,
  },
  homeContent: {
    minWidth: "100% ",
    backgroundColor: "#1a1e25",
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

function Home() {
  const classes = useStyles();

  const { data: latestBlogsData, isPending: isBlogsPending } = useAxiosFetch(
    "http://localhost:8000/blog/latest"
  );

  const {
    data: nextMatchData,
    fetchError,
    isPending,
  } = useAxiosFetch("http://localhost:8000/match/next");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const NavBarContent = (
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
          Enjoy watching Football Matches with Fans from around the Globe!
        </Typography>

        <Grid container justifyContent="center">
          <Link to="/MATCHES">
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

  return (
    <div>
      <MainNavBar currentPageName="Home" NavBarContent={NavBarContent} />

      <BackdropComponent open={isPending || isBlogsPending} />

      <Grid
        container
        className={classes.homeContent}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {!isPending &&
          (nextMatchData.length ? (
            <HomeNextMatchCard nextMatch={nextMatchData} />
          ) : (
            <NoMatchMsg
              msg="There are no Upcoming Matches today!"
              home={true}
            />
          ))}

        {!isBlogsPending && <HomeBlogs latestBlogs={latestBlogsData} />}
      </Grid>
      <Footer />
    </div>
  );
}

export default Home;
