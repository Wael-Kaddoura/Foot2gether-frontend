import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import BlogImg from "../../Images/img_1.jpg";

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

function BlogBody() {
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
          Romulu to stay at Real Madrid?
        </Typography>
        <img className={classes.blogImg} src={BlogImg} alt="blogImage" />
        <Typography className={classes.blogContent} sx={{ mt: 5 }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          inventore soluta sapiente rerum illum. Quae molestias iusto, placeat
          consequuntur quam ipsa eos inventore distinctio quod. Dolorum ut odio
          sapiente animi? In expedita facilis eaque provident debitis id dolorum
          deleniti repellat perspiciatis maiores quod velit mollitia, autem
          facere laboriosam, perferendis quidem quae cum aut quo! Fuga numquam
          dolore maxime earum nisi! Quis, voluptas sint. Error aut ducimus
          quisquam maiores provident nostrum sit, amet, enim dolore rem adipisci
          praesentium accusamus accusantium sint repudiandae est vero!
          <br /> Delectus, nisi dolorem in ratione dolores quidem! Nobis eos
          dolores officia, blanditiis ipsum ab architecto doloremque cupiditate
          provident saepe adipisci asperiores incidunt, accusamus dolore numquam
          magnam voluptate totam fuga quidem beatae repudiandae! Neque ea
          facilis consequatur quas. Veritatis quam consectetur doloremque maxime
          deleniti, nam et commodi, blanditiis quis temporibus aliquam
          reprehenderit mollitia consequatur dolore ex eligendi ratione! Vero
          optio eveniet molestias eius eos suscipit iure, doloremque non?
          <br /> Delectus, nisi dolorem in ratione dolores quidem! Nobis eos
          dolores officia, blanditiis ipsum ab architecto doloremque cupiditate
          provident saepe adipisci asperiores incidunt, accusamus dolore numquam
          magnam voluptate totam fuga quidem beatae repudiandae! Neque ea
          facilis consequatur quas. Veritatis quam consectetur doloremque maxime
          deleniti, nam et commodi, blanditiis quis temporibus aliquam
          reprehenderit mollitia consequatur dolore ex eligendi ratione! Vero
          optio eveniet molestias eius eos suscipit iure, doloremque non?
        </Typography>
      </Grid>
    </Grid>
  );
}

export default BlogBody;
