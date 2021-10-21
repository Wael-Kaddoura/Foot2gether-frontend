import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CircleIcon from "@mui/icons-material/Circle";
import HomeBlog from "./HomeBlog";

const useStyles = makeStyles({
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
  },
  blogsContainer: {
    paddingLeft: "1em",
    maxWidth: 1140,
  },
});

function HomeBlogs() {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.blogsContainer}>
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
            className={classes.title}
          >
            <CircleIcon style={{ fill: "#ee1e46" }} sx={{ mr: 1 }} />
            Latest Blogs
          </Grid>
        </Grid>

        <HomeBlog />
        <HomeBlog />
      </Grid>
    </Grid>
  );
}

export default HomeBlogs;
