import MainNavBar from "../components/NavBar/MainNavBar";
import BlogBody from "../components/Blogs/BlogBody";
import BlogCommentsSection from "../components/Blogs/BlogCommentsSection";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
});

function BlogView() {
  const classes = useStyles();

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        <h1 className={classes.pageTitle}>Romulu to stay at Real Madrid?</h1>
        {/* <p className={classes.pageSubTitle}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta,
          molestias repudiandae pariatur.
        </p> */}
        <Box component="span" className={classes.pageSubtitle}>
          May 20, 2020
        </Box>
        <Box component="span" className={classes.pageSubtitle} sx={{ mx: 3 }}>
          by Admin
        </Box>
      </div>
    </div>
  );

  return (
    <div>
      <MainNavBar NavBarContent={NavBarContent} />
      <BlogBody />
      <BlogCommentsSection />
    </div>
  );
}

export default BlogView;
