import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";

import MainNavBar from "../../components/NavBar/MainNavBar";
import CreateNewBlog from "../../components/Blogs/CreateNewBlog";
import BlogCard from "../../components/Blogs/BlogCard";

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
  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }

  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [blogsData, setBlogsData] = useState(null);

  async function getBlogsData() {
    try {
      let response = await axios.get(`http://localhost:8000/blog`, config);
      let blogs_data = response.data;
      setBlogsData(blogs_data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlogsData();
  }, []);

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

      {isLoaded && (
        <Grid
          className={classes.blogsContainer}
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{ mt: 10 }}
        >
          {blogsData.map((blog) => (
            <BlogCard
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
    </div>
  );
}

export default Blog;