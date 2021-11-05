import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link as ScrollLink } from "react-scroll";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RoomMatchCard from "./MatchCards/RoomMatchCard";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
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
  scrollDown: {
    position: "relative !important",
    width: "100% !important",
    minHeight: "1px !important",
    paddingRight: "15px !important",
    paddingLeft: "15px !important",
    minWidth: "185px !important",
  },
});

function MatchRoomsNavbarContent(props) {
  const { matchData } = props;

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
        xs={8}
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
        className={classes.navbarContent}
      >
        <RoomMatchCard matchData={matchData} />
      </Grid>

      <Grid item xs={2} className={classes.scrollDown}>
        <ScrollLink to="liveRooms" spy={false} smooth={true}>
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

export default MatchRoomsNavbarContent;
