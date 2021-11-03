import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  msgBox: {
    minHeight: 500,
  },
  msg: { fontSize: "25px !important", color: "#808080 !important" },
});

function NoMatchMsg({ msg, home }) {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.msgBox}
      style={{ backgroundColor: home ? "#222831" : "" }}
    >
      <Typography className={classes.msg}>{msg}</Typography>
    </Grid>
  );
}

export default NoMatchMsg;
