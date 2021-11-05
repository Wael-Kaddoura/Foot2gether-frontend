import { Grid, Typography, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BlogComment from "./BlogComment";
import BlogNewComment from "./BlogNewComment";

const useStyles = makeStyles({
  sectionTitle: {
    color: "#fff !important",
    fontSize: "30px !important",
    fontWeight: "700 !important",
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

function BlogComments(props) {
  const {
    blogComments,
    blogCommentsCount,
    blog_id,
    postNewComment,
    postError,
  } = props;

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
        <Typography className={classes.sectionTitle} sx={{ mb: 5 }}>
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
              key={comment.id}
              commentAuthorID={comment.comment_author.id}
              commentAuthor={comment.comment_author.username}
              commentAuthorPP={comment.comment_author.profile_picture}
              commentDate={comment.updatedAt}
              commentBody={comment.body}
            />
          ))}
        </Grid>

        {postError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {postError}
          </Alert>
        )}

        <BlogNewComment blog_id={blog_id} postNewComment={postNewComment} />
      </Grid>
    </Grid>
  );
}

export default BlogComments;
