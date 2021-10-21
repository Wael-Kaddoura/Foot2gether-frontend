import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";

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
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
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
            <Box component="form" sx={{ mb: 5 }}>
              <TextField
                className={classes.formField}
                sx={{ mb: 3 }}
                required
                id="outlined-required"
                label="Blog Title"
                placeholder="Blog Title"
              />

              <TextField
                className={classes.formField}
                id="outlined-multiline-static"
                label="Blog Body"
                multiline
                rows={4}
                sx={{ mb: 3 }}
              />

              <Button variant="outlined" component="label" color="inherit">
                Upload Blog Image
                <input type="file" hidden />
              </Button>
            </Box>

            <Grid container justifyContent="flex-end">
              <Button variant="contained" color="success">
                Create Blog
              </Button>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CreateNewBlog;
