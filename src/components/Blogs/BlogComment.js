import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
  blogsContainer: {
    paddingRight: "5em",
    paddingLeft: "5em",
  },

  userImg: {
    height: "auto",
    width: 50,
    borderRadius: "50%",
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
  },
  commentTime: {
    color: "#ccc",
    fontSize: 13,
    fontWeight: 300,
  },
  commentBody: {
    color: "#808080",
    fontSize: 16,
    fontWeight: 300,
  },
});

function BlogComment(props) {
  const { commentAuthor, commentDate, commentBody, commentAuthorPP } = props;

  const classes = useStyles();

  return (
    <Grid item xs={12} sx={{ mb: 5 }}>
      <Grid container>
        <Grid item xs={2}>
          <img
            className={classes.userImg}
            src={commentAuthorPP}
            alt="blogImage"
          />
        </Grid>
        <Grid item xs={10}>
          <Typography className={classes.userName}>{commentAuthor}</Typography>
          <Typography className={classes.commentTime}>
            {`${new Date(commentDate)}`.substring(0, 21)}
          </Typography>
          <Typography className={classes.commentBody} sx={{ mt: 1 }}>
            {commentBody}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BlogComment;
