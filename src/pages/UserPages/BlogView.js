import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useHistory, Link } from "react-router-dom";
import axios from "axios";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import MainNavBar from "../../components/NavBar/MainNavBar";
import BlogBody from "../../components/Blogs/BlogBody";
import BlogCommentsSection from "../../components/Blogs/BlogCommentsSection";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

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

function BlogView() {
  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status && login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }

  const classes = useStyles();

  const blog_id = new URLSearchParams(useLocation().search).get("id");

  const [isPending, setIsPending] = useState(true);
  const [blogComments, setBlogComments] = useState(null);
  const [postError, setPostError] = useState(null);

  const { data: blogData, isPending: isBlogPending } = useAxiosFetch(
    "http://3.144.252.18/blog/" + blog_id
  );

  async function getBlogComments() {
    try {
      let response = await axios.get(
        "http://3.144.252.18/blog/comments/" + blog_id,
        config
      );
      let blog_comments = response.data;
      setBlogComments(blog_comments);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getBlogComments();
    setIsPending(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  async function postNewComment(data) {
    try {
      let response = await axios.post(
        "http://3.144.252.18/blog/comment",
        data,
        config
      );

      if (response.status === 201) {
        getBlogComments();
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setPostError(err.message);
    }
  }

  const NavBarContent = (
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
        lg={5}
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="center"
        className={classes.navbarContent}
      >
        {!isPending && !isBlogPending && (
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
        )}
      </Grid>
    </Grid>
  );

  return (
    <div>
      <MainNavBar NavBarContent={NavBarContent} />

      <BackdropComponent open={isPending || isBlogPending} />

      {!isPending && !isBlogPending && (
        <div style={{ backgroundColor: "#1a1e25 " }}>
          <BlogBody
            blogTitle={blogData.title}
            blogBody={blogData.body}
            blogImg={blogData.image}
          />

          <BlogCommentsSection
            blogComments={blogComments}
            blogCommentsCount={blogComments.length}
            blog_id={blog_id}
            postNewComment={postNewComment}
            postError={postError}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default BlogView;
