import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
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

function ChangeCoverPhoto({ getMyProfileData }) {
  const token = JSON.parse(localStorage.getItem("login")).token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const new_bio_form = new FormData(event.currentTarget);
    const new_bio = new_bio_form.get("new_bio");

    const data = { new_bio };

    try {
      let response = await axios.post(
        "http://localhost:8000/user/change_bio",
        data,
        config
      );

      if (response.status === 200) {
        console.log("Successfully Changed Bio!");
        getMyProfileData();
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
              Change Bio
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
              <TextField
                className={classes.formField}
                id="outlined-multiline-static"
                label="Bio"
                multiline
                required
                rows={4}
                sx={{ mb: 3 }}
                name="new_bio"
                inputProps={{
                  minLength: 2,
                  maxLength: 70,
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
              >
                Change
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ChangeCoverPhoto;
