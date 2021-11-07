import React, { useEffect } from "react";
import { Grid, Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory, Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import getAPIBaseURL from "../../APIBaseURL";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import MainNavBar from "../../components/NavBar/MainNavBar";
import BlogNavbarContent from "../../components/Blogs/BlogNavbarContent";
import BlogCard from "../../components/Blogs/BlogCard";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const useStyles = makeStyles({
  blogContent: {
    minWidth: "100%",
  },
  blogsContainer: {
    maxWidth: "1400px !important",
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  createBlogFAB: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed !important",
  },
});

function Blog() {
  const classes = useStyles();
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push({
      pathname: "/login",
      state: {
        need_login_first: true,
      },
    });
  }

  const {
    data: blogsData,
    fetchError,
    isPending,
  } = useAxiosFetch(getAPIBaseURL() + "/blog");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BackdropComponent open={isPending} />

      <MainNavBar currentPageName="Blogs">
        <BlogNavbarContent />
      </MainNavBar>
      {!isPending && (
        <Grid
          id="allBlogs"
          container
          className={classes.blogContent}
          direction="row"
          justifyContent="center"
          style={{ backgroundColor: "#1a1e25 " }}
        >
          <Grid
            className={classes.blogsContainer}
            container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-end"
            sx={{ pt: 10, mx: 2 }}
            style={{ backgroundColor: "#1a1e25" }}
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
