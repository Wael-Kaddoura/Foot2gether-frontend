import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
    fontWeight: 700,
  },
  pageSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 17,
    fontWeight: 600,
  },
  blogsContainer: {
    paddingRight: "5em",
    paddingLeft: "5em",
  },
  navbarContentContainer: {
    height: "100vh !important",
    minHeight: "500px !important",
  },
  navbarContent: {
    position: "relative !important",
    width: "100% !important",
    minHeight: "1px !important",
    paddingRight: "15px !important",
    paddingLeft: "15px !important",
  },
  navbarContentTitle: {
    textAlign: "center !important",
    color: "#fff !important",
    fontSize: "50px !important",
    fontWeight: "700 !important",
  },
  navbarContentSubtitle: {
    fontSize: "16px !important",
    fontWeight: "300 !important",
    color: "rgba(255, 255, 255, 0.7) !important",
    textAlign: "center",
  },
});

function BlogViewNavbarContent(props) {
  const { blogData } = props;

  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.navbarContentContainer}
    >
      <Grid
        item
        xs={12}
        lg={8}
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        className={classes.navbarContent}
      >
        <div>
          <Typography className={classes.navbarContentTitle} sx={{ mb: 1 }}>
            {blogData.title}
          </Typography>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              xs={6}
              container
              justifyContent="center"
              className={classes.pageSubtitle}
            >
              {`${new Date(blogData.updatedAt)}`.substring(0, 16)}
            </Grid>

            <Grid
              item
              xs={6}
              container
              justifyContent="center"
              className={classes.pageSubtitle}
            >
              <Link
                to={"/user_profile?id=" + blogData.author.id}
                style={{ color: "#fff" }}
              >
                by {blogData.author.username}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default BlogViewNavbarContent;
