import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BlogImg from "../../Images/img_1.jpg";

const useStyles = makeStyles({
  blogImg: {
    height: "auto",
    width: "100%",
    borderRadius: "4%",
  },
  blogDate: {
    color: "rgba(255, 255, 255, 0.3)",
    fontSize: 12,
    fontWeight: 700,
  },
  blogTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
  },
  blogBody: {
    color: "#808080",
    fontSize: 16,
    fontWeight: 300,
  },
});

function HomeBlog() {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} sx={{ mb: 5 }}>
      <Grid container>
        <Grid item xs={4} sx={{ mr: 2 }}>
          <img className={classes.blogImg} src={BlogImg} alt="blogImage" />
        </Grid>
        <Grid item xs={7}>
          <Typography className={classes.blogDate}>May 20, 2020</Typography>

          <Typography className={classes.blogTitle} sx={{ mb: 3 }}>
            Romulu to stay at Real Madrid?
          </Typography>

          <Typography className={classes.blogBody}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
            deserunt saepe tempora dolorem.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HomeBlog;
