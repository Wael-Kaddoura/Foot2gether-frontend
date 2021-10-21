import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BlogComment from "./BlogComment";
import BlogNewComment from "./BlogNewComment";

const useStyles = makeStyles({
  blogTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 700,
  },
  blogContent: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    fontWeight: 300,
  },
  blogImg: {
    height: "auto",
    width: "100%",
    borderRadius: "2%",
  },
  blogsContainer: {
    paddingRight: "5em",
    paddingLeft: "5em",
  },
});

function BlogComments() {
  const classes = useStyles();

  return (
    <Grid
      container
      sx={{ p: 5 }}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={9} md={7} lg={5}>
        <Typography className={classes.blogTitle} sx={{ mb: 5 }}>
          6 Comments
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <BlogComment />
          <BlogComment />
          <BlogComment />
          <BlogComment />
          <BlogComment />
          <BlogComment />
        </Grid>

        <BlogNewComment />
      </Grid>
    </Grid>
  );
}

export default BlogComments;
