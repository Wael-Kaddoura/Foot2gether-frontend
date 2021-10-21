import MainNavBar from "../components/NavBar/MainNavBar";
import BlogCard from "../components/Blogs/BlogCard";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CreateNewBlog from "../components/Blogs/CreateNewBlog";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
    fontWeight: 700,
  },
  pageSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    fontWeight: 300,
  },

  blogsContainer: {
    paddingRight: "5em",
    paddingLeft: "5em",
  },
});

function Blog() {
  const classes = useStyles();

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        <h1 className={classes.pageTitle}>Blogs</h1>
        <p className={classes.pageSubTitle}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta,
          molestias repudiandae pariatur.
        </p>
        <CreateNewBlog />
      </div>
    </div>
  );

  return (
    <div>
      <MainNavBar currentPageName="Blog" NavBarContent={NavBarContent} />

      <Grid
        className={classes.blogsContainer}
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ mt: 10 }}
      >
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </Grid>
    </div>
  );
}

export default Blog;
