import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  blogImg: {
    height: "auto",
    width: "100%",
    borderRadius: "4%",
  },
  blogDate: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 12,
    fontWeight: 700,
  },
  blogTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
  },
  blogBody: {
    color: "#808080",
    fontSize: 16,
    fontWeight: 300,
  },
});

function HomeBlog(props) {
  const { blogID, blogImg, blogTitle, blogBody, blogDate } = props;

  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} sx={{ mb: 5 }}>
      <Link to={"/blog_view?id=" + blogID}>
        <Grid container>
          <Grid item xs={4} sx={{ mr: 2 }}>
            <img className={classes.blogImg} src={blogImg} alt="blogImage" />
          </Grid>
          <Grid item xs={7}>
            <Typography className={classes.blogDate}>
              {`${new Date(blogDate)}`.substring(0, 16)}
            </Typography>

            <Typography className={classes.blogTitle} sx={{ mb: 3 }}>
              {blogTitle}
            </Typography>

            <Typography className={classes.blogBody}>
              {blogBody.substring(0, 97) + "..."}
            </Typography>
          </Grid>
        </Grid>
      </Link>{" "}
    </Grid>
  );
}

export default HomeBlog;
