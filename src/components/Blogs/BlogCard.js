import { Grid, Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import BlogImg from "../../Images/img_1.jpg";

const useStyles = makeStyles((theme) => ({
  blogImg: {
    borderRadius: "4%",

    [theme.breakpoints.between("xs", "sm")]: {
      height: "auto",
      width: "100%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      height: "auto",
      width: "100%",
    },
  },
  blogInfo: {
    width: "100%",
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
    color: "gray",
    fontSize: 16,
    fontWeight: 300,
  },
  blogReadMore: {
    color: "#ee1e46",
    fontSize: "16px !important",
    fontWeight: "600 !important",
  },
}));

function BlogCard() {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={4} lg={3} sx={{ mb: 5, mr: 1 }}>
      <img className={classes.blogImg} src={BlogImg} alt="blogImage" />
      <Box className={classes.blogInfo} sx={{ mt: 3 }}>
        <Typography className={classes.blogDate}>May 20, 2020</Typography>
        <Typography className={classes.blogTitle} sx={{ mb: 2 }}>
          Romulu to stay at Real Madrid?
        </Typography>
        <Typography className={classes.blogBody}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus
          deserunt saepe tempora dolorem.
        </Typography>
        <Typography className={classes.blogReadMore} sx={{ mt: 2 }}>
          Read More
        </Typography>
      </Box>
    </Grid>
  );
}

export default BlogCard;
