import { Grid } from "@mui/material";
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
    minHeight: 500,
  },
});

function HomeBlogs({ latestBlogs }) {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      className={classes.blogsContainer}
      container
      alignItems="center"
    >
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

        {latestBlogs.map((blog) => (
          <HomeBlog
            key={blog.id}
            blogID={blog.id}
            blogImg={blog.image}
            blogTitle={blog.title}
            blogBody={blog.body}
            blogDate={blog.updatedAt}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default HomeBlogs;
