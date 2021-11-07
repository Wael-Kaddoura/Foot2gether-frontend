import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import MainNavBar from "../../components/NavBar/MainNavBar";
import BlogViewNavbarContent from "../../components/Blogs/BlogViewNavbarContent";
import BlogBody from "../../components/Blogs/BlogBody";
import BlogCommentsSection from "../../components/Blogs/BlogCommentsSection";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

function BlogView() {
  const history = useHistory();

  //check user login status
  let config = "";
  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push({
      pathname: "/login",
      state: {
        need_login_first: true,
      },
    });
  } else {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  }

  const blog_id = new URLSearchParams(useLocation().search).get("id");

  const [isPending, setIsPending] = useState(true);
  const [blogComments, setBlogComments] = useState(null);
  const [postError, setPostError] = useState(null);

  const { data: blogData, isPending: isBlogPending } = useAxiosFetch(
    getAPIBaseURL() + "/blog/" + blog_id
  );

  async function getBlogComments() {
    try {
      let response = await axios.get(
        getAPIBaseURL() + "/blog/comments/" + blog_id,
        config
      );
      let blog_comments = response.data;
      setBlogComments(blog_comments);
    } catch (error) {
      console.log(error);
    }
  }

  async function postNewComment(data) {
    try {
      let response = await axios.post(
        getAPIBaseURL() + "/blog/comment",
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

  async function fetchData() {
    await getBlogComments();
    setIsPending(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  return (
    <div>
      <BackdropComponent open={isPending || isBlogPending} />

      <MainNavBar>
        {!isPending && !isBlogPending && (
          <BlogViewNavbarContent blogData={blogData} />
        )}
      </MainNavBar>

      {!isPending && !isBlogPending && (
        <div style={{ backgroundColor: "#1a1e25" }}>
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
