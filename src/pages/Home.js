import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import MainNavBar from "../components/NavBar/MainNavBar";
import HomeMatchCard from "../components/Matches/MatchCards/HomeMatchCard";

const useStyles = makeStyles({
  viewMatchesBtn: {
    color: "#fff",
    backgroundColor: "#ee1e46",
    borderColor: "#ee1e46",
    width: 150,
    height: 55,
  },
});

function Home() {
  const classes = useStyles();

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
    </div>
  );
}

export default Home;
