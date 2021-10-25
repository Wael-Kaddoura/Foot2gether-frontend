import * as React from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles({
  formTitle: {
    color: "#000000",
    fontSize: 25,
    fontWeight: 600,
  },
  formField: {
    width: "100%",
  },
});

function CreateNewBlog() {
  const token = JSON.parse(localStorage.getItem("login")).token;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        setOpen(false);
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
      <Button variant="contained" color="success" onClick={handleOpen}>
        Create New Blog
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          >
            <Typography
              id="transition-modal-title"
              className={classes.formTitle}
              sx={{ mb: 5 }}
            >
              Create New Blog:
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
              <TextField
                className={classes.formField}
                sx={{ mb: 3 }}
                required
                id="outlined-required"
                label="Blog Title"
                placeholder="Blog Title"
                name="blog_title"
              />

              <TextField
                className={classes.formField}
                id="outlined-multiline-static"
                label="Blog Body"
                multiline
                required
                rows={4}
                sx={{ mb: 3 }}
                name="blog_body"
              />

              <Button variant="outlined" component="label" color="inherit">
                Upload Blog Image
                <input type="file" required name="blog_image" />
              </Button>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Blog
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CreateNewBlog;
