import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import person1 from "../../Images/person_1.jpg";

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

function BlogComment() {
  const classes = useStyles();

  return (
    <Grid item xs={12} sx={{ mb: 5 }}>
      <Grid container>
        <Grid item xs={2}>
          <img className={classes.userImg} src={person1} alt="blogImage" />
        </Grid>
        <Grid item xs={10}>
          <Typography className={classes.userName}>John Doe</Typography>
          <Typography className={classes.commentTime}>
            JANUARY 9, 2018 AT 2:21PM
          </Typography>
          <Typography className={classes.commentBody} sx={{ mt: 1 }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
            quidem laborum necessitatibus, ipsam impedit vitae autem, eum
            officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum
            impedit necessitatibus, nihil?
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BlogComment;
