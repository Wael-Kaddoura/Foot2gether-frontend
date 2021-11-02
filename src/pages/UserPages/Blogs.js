import { useEffect } from "react";
import { Grid, Typography, Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory, Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import MainNavBar from "../../components/NavBar/MainNavBar";
import BlogCard from "../../components/Blogs/BlogCard";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
    color: "#fff",
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
  createBlogFAB: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed !important",
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

function Blog() {
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push("/login");
  }

  const classes = useStyles();

  const {
    data: blogsData,
    fetchError,
    isPending,
  } = useAxiosFetch("http://localhost:8000/blog");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const NavBarContent = (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      className={classes.navbarContentContainer}
    >
      <Grid
        item
        xs={7}
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        className={classes.navbarContent}
      >
        <Typography className={classes.navbarContentTitle} sx={{ mb: 1 }}>
          Blogs
        </Typography>

        <Typography className={classes.navbarContentSubtitle} sx={{ mb: 1 }}>
          Share your thoughts with other fans!
        </Typography>
      </Grid>

      <Grid xs={2} className={classes.navbarContent}>
        <ScrollLink to="allBlogs" spy={false} smooth={true}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography>Scroll to Blogs</Typography>
            <ArrowDownwardIcon style={{ color: "#fff" }} />
          </Grid>
        </ScrollLink>
      </Grid>
    </Grid>
  );

  return (
    <div>
      <MainNavBar currentPageName="Blogs" NavBarContent={NavBarContent} />

      <BackdropComponent open={isPending} />

      {!isPending && (
        <Grid
          id="allBlogs"
          className={classes.blogsContainer}
          container
          direction="row"
          justifyContent="space-around"
          alignItems="flex-end"
          sx={{ pt: 10 }}
          style={{ backgroundColor: "#1a1e25 " }}
        >
          {blogsData.map((blog) => (
            <BlogCard
              key={blog.id}
              blogID={blog.id}
              blogImg={blog.image}
              blogTitle={blog.title}
              blogBody={blog.body}
              blogDate={blog.updatedAt}
              blogAuthor={blog.author.username}
            />
          ))}
        </Grid>
      )}
      <Link to="/create_blog">
        <Fab color="primary" aria-label="add" className={classes.createBlogFAB}>
          <AddIcon />
        </Fab>
      </Link>
      <Footer />
    </div>
  );
}

export default Blog;
