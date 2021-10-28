import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

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
  const [blogData, setBlogData] = useState(null);
  const [blogComments, setBlogComments] = useState(null);
  const [blogCommentsCount, setBlogCommentsCount] = useState(null);

  async function getBlogData() {
    try {
      let response = await axios.get(
        "http://localhost:8000/blog/" + blog_id,
        config
      );
      let blog_data = response.data;
      setBlogData(blog_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBlogComments() {
    try {
      let response = await axios.get(
        "http://localhost:8000/blog/comments/" + blog_id,
        config
      );
      let blog_comments = response.data;
      setBlogComments(blog_comments);
    } catch (error) {
      console.log(error);
    }
  }

  async function getBlogCommentsCount() {
    try {
      let response = await axios.get(
        "http://localhost:8000/blog/comments_count/" + blog_id,
        config
      );
      let blog_comments_count = response.data.comments_count;
      setBlogCommentsCount(blog_comments_count);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCommentsData() {
    await getBlogComments();
    await getBlogCommentsCount();
  }

  async function fetchData() {
    await getBlogData();
    await getCommentsData();
    setIsPending(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        {!isPending && (
          <div>
            <h1 className={classes.pageTitle}>{blogData.title} </h1>

            <Box component="span" className={classes.pageSubtitle}>
              {`${new Date(blogData.updatedAt)}`.substring(0, 16)}
            </Box>
            <Box
              component="span"
              className={classes.pageSubtitle}
              sx={{ mx: 3 }}
            >
              by {blogData.author.username}
            </Box>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <MainNavBar NavBarContent={NavBarContent} />

      <BackdropComponent open={isPending} />

      {!isPending && (
        <div style={{ backgroundColor: "#1a1e25 " }}>
          <BlogBody
            blogTitle={blogData.title}
            blogBody={blogData.body}
            blogImg={blogData.image}
          />
          <BlogCommentsSection
            blogComments={blogComments}
            blogCommentsCount={blogCommentsCount}
            blog_id={blog_id}
            getCommentsData={getCommentsData}
            config={config}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default BlogView;
