import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Grid, Button } from "@mui/material";
import axios from "axios";

import MainNavBar from "../components/NavBar/MainNavBar";
import HomeMatchCard from "../components/Home/HomeMatchCard";
import HomeBlogs from "../components/Home/HomeBlogs";
import HomeNextMatchCard from "../components/Home/HomeNextMatchCard";

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
  },
});

function Home() {
  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [latestBlogsData, setLatestBlogsData] = useState(null);

  async function getLatestBlogs() {
    try {
      let response = await axios.get("http://localhost:8000/blog/latest");
      let latest_blogs_data = response.data;
      console.log(latest_blogs_data);
      setLatestBlogsData(latest_blogs_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getLatestBlogs();

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
      <HomeMatchCard />
      <Grid
        container
        className={classes.homeContent}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <HomeNextMatchCard />
        {isLoaded && <HomeBlogs latestBlogs={latestBlogsData} />}
      </Grid>
    </div>
  );
}

export default Home;
