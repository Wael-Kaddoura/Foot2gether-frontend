import { useEffect } from "react";

import { Grid, Button } from "@mui/material";
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
    backgroundColor: "#ee1e46",
    borderColor: "#ee1e46",
    width: 150,
    height: 55,
  },
  homeContent: {
    minWidth: "100%",
    backgroundColor: "#1a1e25",
  },
});

function Home() {
  const classes = useStyles();

  const { data: latestBlogsData } = useAxiosFetch(
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
    <div className="row align-items-center">
      <div className="col-lg-5 ml-auto">
        <h1 className="text-white text-center">Welcome to Foot2gether</h1>
        <p className="text-center">
          Enjoy watching Football Matches with Fans from around the Globe!
        </p>
        <p className="text-center">
          <Link to="/MATCHES">
            <Button
              className={classes.viewMatchesBtn}
              variant="outlined"
              color="error"
            >
              View Matches
            </Button>
          </Link>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <MainNavBar currentPageName="Home" NavBarContent={NavBarContent} />

      <BackdropComponent open={isPending} />

      <Grid
        container
        className={classes.homeContent}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {!isPending ? (
          nextMatchData.length ? (
            <HomeNextMatchCard nextMatch={nextMatchData} />
          ) : (
            <NoMatchMsg
              msg="There are no Upcoming Matches today!"
              home={true}
            />
          )
        ) : (
          ""
        )}
        {!isPending && <HomeBlogs latestBlogs={latestBlogsData} />}
      </Grid>
      <Footer />
    </div>
  );
}

export default Home;
