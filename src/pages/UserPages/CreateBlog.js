import React, { useState, useEffect } from "react";
import { Box, Button, Typography, TextField, Grid, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
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
    color: "#fff !important",
    fontSize: "40px !important",
  },
  form: {
    width: "90%",
    maxWidth: "800px !important",
  },
  formField: {
    width: "100%",
  },
  formLabel: {
    color: "#fff !important",
  },
  multilineColor: {
    color: "#fff !important",
    backgroundColor: "rgba(255, 255, 255, 0.08) ",
  },
});

function CreateBlog() {
  const classes = useStyles();
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

  const [isPending, setIsPending] = useState(false);
  const [postError, setPostError] = useState(null);

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
        getAPIBaseURL() + "/blog",
        formData,
        config
      );

      if (response.status === 201) {
        setIsPending(false);
        setPostError(null);
        history.push("/blogs");
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setPostError(err.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BackdropComponent open={isPending} />

      <SecondaryNavBar />

      <Grid className={classes.pageContainer} container sx={{ pt: 3 }}>
        <Grid item xs={12} sx={{ mb: 3 }} container justifyContent="center">
          <Typography className={classes.pageTitle}>Create New Blog</Typography>
        </Grid>

        <Grid item xs={12} container justifyContent="center">
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mb: 5 }}
            className={classes.form}
          >
            {postError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {postError}
              </Alert>
            )}

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
              inputProps={{ minLength: 5, maxLength: 1234 }}
              InputLabelProps={{ className: classes.formLabel }}
            />

            <Typography style={{ color: "#fff" }} sx={{ mb: 1 }}>
              Upload Blog Image
            </Typography>

            <input
              type="file"
              required
              name="blog_image"
              style={{ color: "#808080 !important" }}
            />

            <Grid container justifyContent="flex-end">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
                style={{ width: "35%" }}
              >
                Create Blog
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default CreateBlog;
