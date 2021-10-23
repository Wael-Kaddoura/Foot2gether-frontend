import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BlogComment from "./BlogComment";
import BlogNewComment from "./BlogNewComment";

const useStyles = makeStyles({
  blogTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: 700,
  },
  blogContent: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 16,
    fontWeight: 300,
  },
  blogImg: {
    height: "auto",
    width: "100%",
    borderRadius: "2%",
  },
  blogsContainer: {
    paddingRight: "5em",
    paddingLeft: "5em",
  },
});

function BlogComments({
  blogComments,
  blogCommentsCount,
  blog_id,
  getCommentsData,
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      sx={{ p: 5 }}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={9} md={7} lg={5}>
        <Typography className={classes.blogTitle} sx={{ mb: 5 }}>
          {blogCommentsCount} Comments
        </Typography>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {blogComments.map((comment) => (
            <BlogComment
              commentAuthor={comment.comment_author.username}
              commentAuthorPP={comment.comment_author.profile_picture}
              commentDate={comment.updatedAt}
              commentBody={comment.body}
            />
          ))}
        </Grid>

        <BlogNewComment blog_id={blog_id} getCommentsData={getCommentsData} />
      </Grid>
    </Grid>
  );
}

export default BlogComments;
