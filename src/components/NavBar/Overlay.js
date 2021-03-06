import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import getAPIBaseURL from "../../APIBaseURL";

const useStyles = makeStyles({
  overlayContainer: {
    maxWidth: "1140px !important",
    width: "100% !important",
    paddingRight: "15px !important",
    paddingLeft: "15px !important",
    marginRight: "auto !important",
    marginLeft: "auto !important",
    display: "block !important",
    boxSizing: "border-box !important",
  },
});

function Overlay(props) {
  const { NavBarContent, children } = props;

  const classes = useStyles();
  const overlayBackgroundImage =
    getAPIBaseURL() + "/cover_photo/default_cover_photo.jpg";

  return (
    <div
      className="hero overlay"
      style={{
        backgroundImage: `url(${overlayBackgroundImage})`,
      }}
    >
      <Box className={classes.overlayContainer}>
        {NavBarContent ? NavBarContent : children}
      </Box>
    </div>
  );
}

export default Overlay;
