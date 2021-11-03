import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  msgBox: {
    minHeight: "500px !important",
  },
  msg: { fontSize: "25px !important" },
});

function UserSearchNoResults({ msg }) {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.msgBox}
    >
      <Typography className={classes.msg}>
        There are no results found!
      </Typography>
    </Grid>
  );
}

export default UserSearchNoResults;
