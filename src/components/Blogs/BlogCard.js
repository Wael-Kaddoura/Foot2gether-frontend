import { Grid, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  blogImg: {
    height: "auto",
    width: "100%",
    borderRadius: "4%",
  },
  blogInfo: {
    width: "100%",
  },
  blogDate: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: "12px !important",
    fontWeight: "700 !important",
  },
  blogTitle: {
    color: "#fff !important",
    fontSize: "18px !important",
    fontWeight: "500 !important",
  },
  blogBody: {
    color: "gray",
    fontSize: 16,
    fontWeight: 300,
  },
  blogReadMore: {
    color: "#ee1e46",
    fontSize: "16px !important",
    fontWeight: "600 !important",
  },
});

function BlogCard(props) {
  const { blogID, blogImg, blogTitle, blogBody, blogDate } = props;

  const classes = useStyles();

  return (
    <Grid item xs={12} md={4} lg={3} sx={{ mb: 5, mr: 1 }}>
      <Link to={"/blog_view?id=" + blogID}>
        <img className={classes.blogImg} src={blogImg} alt="blogImage" />
        <Box className={classes.blogInfo} sx={{ mt: 3 }}>
          <Typography className={classes.blogDate}>
            {`${new Date(blogDate)}`.substring(0, 16)}
          </Typography>
          <Typography className={classes.blogTitle} sx={{ mb: 2 }}>
            {blogTitle}
          </Typography>
          <Typography className={classes.blogBody}>
            {blogBody.substring(0, 97) + "..."}
          </Typography>
          <Typography className={classes.blogReadMore} sx={{ mt: 2 }}>
            Read More
          </Typography>
        </Box>
      </Link>
    </Grid>
  );
}

export default BlogCard;
