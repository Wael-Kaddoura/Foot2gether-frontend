import * as React from "react";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
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

function ChangeProfilePicture({ getMyProfileData }) {
  let user_data = JSON.parse(localStorage.getItem("login"));

  const token = user_data.token;
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
    const new_profile_picture = new FormData(event.currentTarget);
    const image = new_profile_picture.get("profile_picture");

    const formData = new FormData();
    formData.append("image", image);

    try {
      let response = await axios.post(
        "http://localhost:8000/user/change_profile_picture",
        formData,
        config
      );

      if (response.status === 200) {
        user_data.user_profile_picture = response.data;
        localStorage.setItem("login", JSON.stringify(user_data));

        getMyProfileData();
        setOpen(false);
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <EditIcon onClick={handleOpen} />

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
              Change Profile Picture
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
              <Typography
                style={{ color: "#000", fontWeight: 700 }}
                sx={{ mb: 1 }}
              >
                Upload Image
              </Typography>
              <input type="file" required name="profile_picture" />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Upload Image
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ChangeProfilePicture;
