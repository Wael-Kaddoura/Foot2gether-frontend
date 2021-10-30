import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import date from "date-and-time";

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
  const {
    commentAuthorID,
    commentAuthor,
    commentDate,
    commentBody,
    commentAuthorPP,
  } = props;

  //formating comment date and time
  let comment_date_time = date.format(
    new Date(commentDate),
    "ddd, MMM DD YYYY hh:mm A"
  );

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
          <Typography className={classes.userName}>
            <Link
              to={"/user_profile?id=" + commentAuthorID}
              style={{ color: "#fff" }}
            >
              {commentAuthor}
            </Link>
          </Typography>
          <Typography className={classes.commentTime}>
            {comment_date_time}
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
