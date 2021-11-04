import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link as ScrollLink } from "react-scroll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import RoomSearchBar from "../../components/Rooms/RoomSearchBar";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
    color: "#fff",
    fontWeight: 700,
  },
  navbarContentContainer: {
    height: "100vh !important",
    minHeight: "500px !important",
  },
  navbarContent: {
    position: "relative !important",
    width: "100% !important",
    minHeight: "1px !important",
    paddingRight: "15px !important",
    paddingLeft: "15px !important",
  },
  navbarContentTitle: {
    textAlign: "center !important",
    color: "#fff !important",
    fontSize: "50px !important",
    fontWeight: "700 !important",
  },
  navbarContentSubtitle: {
    fontSize: "16px !important",
    fontWeight: "300 !important",
    color: "rgba(255, 255, 255, 0.7) !important",
    textAlign: "center",
  },
  scrollDown: {
    position: "relative !important",
    width: "100% !important",
    minHeight: "1px !important",
    paddingRight: "15px !important",
    paddingLeft: "15px !important",
    minWidth: "185px !important",
  },
});

function RoomsNavbarContent(props) {
  const { searchHandler, liveRoomsCount } = props;

  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      className={classes.navbarContentContainer}
    >
      <Grid
        item
        xs={7}
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        className={classes.navbarContent}
      >
        <Typography className={classes.navbarContentTitle} sx={{ mb: 1 }}>
          Rooms
        </Typography>

        <Typography className={classes.navbarContentSubtitle} sx={{ mb: 2 }}>
          There are currently {liveRoomsCount} Live Rooms!
        </Typography>

        <RoomSearchBar searchHandler={searchHandler} />
      </Grid>

      <Grid xs={2} className={classes.scrollDown}>
        <ScrollLink to="allLiveRooms" spy={false} smooth={true}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography>Scroll to Rooms</Typography>
            <ArrowDownwardIcon style={{ color: "#fff" }} />
          </Grid>
        </ScrollLink>
      </Grid>
    </Grid>
  );
}

export default RoomsNavbarContent;
