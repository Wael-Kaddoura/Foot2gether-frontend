import { useState, useEffect } from "react";
import MainNavBar from "../components/NavBar/MainNavBar";
import BlogBody from "../components/Blogs/BlogBody";
import BlogCommentsSection from "../components/Blogs/BlogCommentsSection";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import axios from "axios";

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

  const blog_id = new URLSearchParams(useLocation().search).get("id");

  const [isLoaded, setIsLoaded] = useState(false);
  const [blogData, setBlogData] = useState(null);

  async function getBlogData() {
    try {
      let response = await axios.get("http://localhost:8000/blog/" + blog_id);
      let blog_data = response.data;
      setBlogData(blog_data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlogData();
  }, []);

  const NavBarContent = (
    <div className="row align-items-center">
      <div className="col-lg-5 mx-auto text-center">
        {isLoaded && (
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
      {isLoaded && (
        <div>
          <BlogBody
            blogTitle={blogData.title}
            blogBody={blogData.body}
            blogImg={blogData.image}
          />
          <BlogCommentsSection />
        </div>
      )}
    </div>
  );
}

export default BlogView;
