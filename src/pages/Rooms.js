import { makeStyles } from "@mui/styles";
import { Grid, Button } from "@mui/material";
import MainNavBar from "../components/NavBar/MainNavBar";
import SearchBar from "../components/SearchBar";
import LiveRoomCard from "../components/Rooms/LiveRoomCard";
import CircleIcon from "@mui/icons-material/Circle";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
    fontWeight: 700,
  },
  roomsContainer: {
    maxWidth: 1140,
  },
  bodyTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
  },
  roomContent: {
    minWidth: "100%",
  },
});

function Rooms() {
  const classes = useStyles();

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        <h1 className={classes.pageTitle}>Rooms</h1>
        <p className={classes.pageSubTitle}>
          There are currently 23 Live Rooms!
        </p>
        <SearchBar />
      </div>
    </div>
  );

  return (
    <div>
      <MainNavBar currentPageName="Rooms" NavBarContent={NavBarContent} />

      <Grid
        container
        className={classes.roomContent}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} className={classes.roomsContainer}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 5 }}
          >
            <Grid item xs={12} sx={{ mb: 5 }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                className={classes.bodyTitle}
              >
                <CircleIcon style={{ fill: "#ee1e46" }} sx={{ mr: 1 }} />
                Live Rooms
              </Grid>
            </Grid>

            <LiveRoomCard />
            <LiveRoomCard />
            <LiveRoomCard />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Rooms;
