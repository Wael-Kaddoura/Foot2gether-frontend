import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  msgBox: {
    minHeight: 500,
  },
  msg: { fontSize: 25, color: "#808080 !important" },
});

function NoContentMsg(props) {
  const { msg } = props;

  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.msgBox}
    >
      <Typography className={classes.msg}>{msg}</Typography>
    </Grid>
  );
}

export default NoContentMsg;
