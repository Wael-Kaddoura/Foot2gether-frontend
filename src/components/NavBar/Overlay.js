import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

function Overlay({ NavBarContent }) {
  const classes = useStyles();

  return (
    <div
      className="hero overlay"
      style={{
        backgroundImage: `url(https://foot2gether.ml/cover_photo/default_cover_photo.jpg)`,
      }}
    >
      <Box className={classes.overlayContainer}>{NavBarContent}</Box>
    </div>
  );
}

export default Overlay;
