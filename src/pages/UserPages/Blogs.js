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
    position: "fixed",
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
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        <h1 className={classes.pageTitle}>Blogs</h1>
        <p className={classes.pageSubTitle}>
          Share your thoughts with other fans!
        </p>

        <Grid>
          <ScrollLink to="allBlogs" spy={false} smooth={true}>
            <Typography>Scroll to All Blogs</Typography>
            <ArrowDownwardIcon style={{ color: "#fff" }} />
          </ScrollLink>
        </Grid>
      </div>
    </div>
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
