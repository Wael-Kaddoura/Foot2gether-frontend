import { useEffect } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import getAPIBaseURL from "../../APIBaseURL";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import MainNavBar from "../../components/NavBar/MainNavBar";
import HomeNavbarContent from "../../components/Home/HomeNavbarContent";
import HomeNextMatch from "../../components/Home/HomeNextMatch";
import NoMatchMsg from "../../components/Matches/NoMatchMsg";
import HomeBlogs from "../../components/Home/HomeBlogs";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const useStyles = makeStyles({
  homeContent: {
    minWidth: "100% ",
    backgroundColor: "#1a1e25",
  },
});

function Home() {
  const classes = useStyles();

  const { data: latestBlogsData, isPending: isBlogsPending } = useAxiosFetch(
    getAPIBaseURL() + "/blog/latest"
  );

  const {
    data: nextMatchData,
    fetchError,
    isPending,
  } = useAxiosFetch(getAPIBaseURL() + "/match/next");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BackdropComponent open={isPending || isBlogsPending} />

      <MainNavBar currentPageName="Home">
        <HomeNavbarContent />
      </MainNavBar>

      <Grid
        container
        className={classes.homeContent}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {!isPending &&
          !isBlogsPending &&
          (nextMatchData.length ? (
            <HomeNextMatch
              team1Name={nextMatchData[0].team1.name}
              team1Logo={nextMatchData[0].team1.logo}
              team2Name={nextMatchData[0].team2.name}
              team2Logo={nextMatchData[0].team2.logo}
              stadium={nextMatchData[0].stadium}
              league={nextMatchData[0].competition.name}
              kickOff={nextMatchData[0].kick_off}
              matchDay={nextMatchData[0].match_day}
            />
          ) : (
            <NoMatchMsg
              msg="There are no Upcoming Matches today!"
              home={true}
            />
          ))}

        {!isPending && !isBlogsPending && (
          <HomeBlogs latestBlogs={latestBlogsData} />
        )}
      </Grid>

      <Footer />
    </div>
  );
}

export default Home;
