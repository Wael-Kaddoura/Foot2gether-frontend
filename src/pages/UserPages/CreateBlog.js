import React, { useState } from "react";
import { Box, Button, Typography, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";

import SecondaryNavBar from "../../components/NavBar/SecondaryNavBar";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const useStyles = makeStyles({
  pageContainer: {
    width: "100%",
    backgroundColor: "#1a1e25 ",
  },
  pageTitle: {
    color: "#fff",
    fontSize: 40,
  },
  form: {
    width: "60%",
  },
  formField: {
    width: "100%",
  },
  formLabel: {
    color: "#fff",
  },
  multilineColor: {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
});

function CreateBlog() {
  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status && login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }
  const classes = useStyles();

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsPending(true);

    const new_blog_data = new FormData(event.currentTarget);
    const title = new_blog_data.get("blog_title");
    const body = new_blog_data.get("blog_body");
    const image = new_blog_data.get("blog_image");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image);

    try {
      let response = await axios.post(
        "http://localhost:8000/blog",
        formData,
        config
      );

      if (response.status === 201) {
        console.log("Successfully Created Blog!");
        setIsPending(false);
        history.push("/blogs");
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      if (err.response.status === 401) {
        console.log("Something went wrong!");
      }
      console.log(err);
    }
  };

  return (
    <div>
      <SecondaryNavBar />

      <BackdropComponent open={isPending} />

      <Grid className={classes.pageContainer} container sx={{ pt: 1 }}>
        <Grid item xs={12} sx={{ mb: 2 }} container justifyContent="center">
          <Typography className={classes.pageTitle}>Create New Blog</Typography>
        </Grid>

        <Grid item xs={12} sx={{ ml: 2 }} container justifyContent="center">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mb: 5 }}
            className={classes.form}
          >
            <TextField
              className={classes.formField}
              sx={{ mb: 3 }}
              required
              id="outlined-required"
              label="Blog Title"
              placeholder="Blog Title"
              name="blog_title"
              InputProps={{ className: classes.multilineColor }}
              InputLabelProps={{ className: classes.formLabel }}
            />

            <TextField
              className={classes.formField}
              id="outlined-multiline-static"
              label="Blog Body"
              multiline
              required
              rows={12}
              sx={{ mb: 3 }}
              name="blog_body"
              InputProps={{ className: classes.multilineColor }}
              InputLabelProps={{ className: classes.formLabel }}
            />

            <Typography style={{ color: "#fff" }} sx={{ mb: 1 }}>
              Upload Blog Image
            </Typography>

            <input type="file" required name="blog_image" />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
            >
              Create Blog
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default CreateBlog;
