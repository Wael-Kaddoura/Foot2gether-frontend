import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  blogTitle: {
    color: "#fff",
    fontSize: "30px !important",
    fontWeight: "700 !important",
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

function BlogBody(props) {
  const { blogTitle, blogBody, blogImg } = props;

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
          {blogTitle}
        </Typography>
        <img className={classes.blogImg} src={blogImg} alt="blogImage" />
        <Typography className={classes.blogContent} sx={{ mt: 5 }}>
          {blogBody}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default BlogBody;
