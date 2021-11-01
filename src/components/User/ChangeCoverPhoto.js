import * as React from "react";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";

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
    color: "#000000 !important",
    fontSize: "25px !important",
    fontWeight: "600 !important",
  },
  formField: {
    width: "100%",
  },
});

function ChangeCoverPhoto({ getMyProfileData, changeCoverPhoto }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const new_cover_photo = new FormData(event.currentTarget);
    const image = new_cover_photo.get("cover_photo");

    const formData = new FormData();
    formData.append("image", image);

    await changeCoverPhoto(formData);
    setOpen(false);
  };

  return (
    <div>
      <EditIcon onClick={handleOpen} style={{ color: "#fff" }} sx={{ mb: 1 }} />

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
              Change Cover Photo
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
              <Typography
                style={{ color: "#000", fontWeight: 700 }}
                sx={{ mb: 1 }}
              >
                Upload Image
              </Typography>

              <input type="file" required name="cover_photo" />

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

export default ChangeCoverPhoto;
