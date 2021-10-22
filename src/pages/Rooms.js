import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import MainNavBar from "../components/NavBar/MainNavBar";
import SearchBar from "../components/SearchBar";
import LiveRoomCard from "../components/Rooms/LiveRoomCard";
import CreateNewRoom from "../components/Rooms/CreateNewRoom";
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
      >
        <Grid
          item
          xs={12}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.roomsContainer}
          sx={{ mx: 2, mt: 5 }}
        >
          <Grid item xs={12} container sx={{ mb: 5 }}>
            <Grid
              item
              xs={7}
              container
              direction="row"
              alignItems="center"
              className={classes.bodyTitle}
            >
              <CircleIcon style={{ fill: "#ee1e46" }} sx={{ mr: 1 }} />
              Live Rooms
            </Grid>

            <Grid item xs={5} style={{ textAlign: "right" }}>
              <CreateNewRoom />
            </Grid>
          </Grid>

          <LiveRoomCard />
          <LiveRoomCard />
          <LiveRoomCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default Rooms;
