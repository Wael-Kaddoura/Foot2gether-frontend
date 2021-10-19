import MainNavBar from "../components/NavBar/MainNavBar";
import MatchesTab from "../components/Matches/MatchesTab";
import SearchBar from "../components/SearchBar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
    fontWeight: 700,
  },
});

function Matches() {
  const classes = useStyles();

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        <h1 className={classes.pageTitle}>Matches</h1>
        <p className={classes.pageSubTitle}>
          Choose any Match to enjoy watching the game with other fans!
        </p>
        <SearchBar />
      </div>
    </div>
  );
  return (
    <div>
      <MainNavBar currentPageName="Matches" NavBarContent={NavBarContent} />
      <MatchesTab />
    </div>
  );
}

export default Matches;
