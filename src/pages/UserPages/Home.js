import { useState, useEffect } from "react";

import { Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import axios from "axios";

import MainNavBar from "../../components/NavBar/MainNavBar";
import HomeNextMatchCard from "../../components/Home/HomeNextMatchCard";
import NoMatchMsg from "../../components/Matches/NoMatchMsg";
import HomeBlogs from "../../components/Home/HomeBlogs";
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

  const [isLoaded, setIsLoaded] = useState(false);
  const [latestBlogsData, setLatestBlogsData] = useState(null);
  const [nextMatchData, setNextMatchData] = useState(null);

  async function getNextMatchData() {
    try {
      let response = await axios.get("http://localhost:8000/match/next");
      let next_match_data = response.data;
      setNextMatchData(next_match_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getLatestBlogs() {
    try {
      let response = await axios.get("http://localhost:8000/blog/latest");
      let latest_blogs_data = response.data;
      setLatestBlogsData(latest_blogs_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getLatestBlogs();
    await getNextMatchData();
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
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
      <Grid
        container
        className={classes.homeContent}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {isLoaded ? (
          nextMatchData ? (
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
        {isLoaded && <HomeBlogs latestBlogs={latestBlogsData} />}
      </Grid>
      <Footer />
    </div>
  );
}

export default Home;
