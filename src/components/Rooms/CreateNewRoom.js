import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import CreateNewRoomMenuItem from "./CreateNewRoomMenuItem";
import CreateRoomSnackbar from "./CreateRoomSnackbar";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CreateNewRoom({ getLiveRooms }) {
  const classes = useStyles();

  const token = JSON.parse(localStorage.getItem("login")).token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const {
    data: availableMatches,
    fetchError,
    isPending,
  } = useAxiosFetch("http://localhost:8000/match/available");

  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [match, setMatch] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleChange = (event) => {
    setMatch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const new_room_data = new FormData(event.currentTarget);
    const name = new_room_data.get("room_name");
    const match_id = new_room_data.get("match_id");

    const data = {
      name,
      match_id,
    };

    setOpen(false);

    try {
      let response = await axios.post(
        "http://localhost:8000/room",
        data,
        config
      );

      if (response.status === 200) {
        getLiveRooms();
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create New Room
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
              Create New Room:
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
              <TextField
                className={classes.formField}
                sx={{ mb: 3 }}
                required
                id="outlined-required"
                label="Room Name"
                placeholder="Room Name"
                name="room_name"
              />

              <InputLabel id="match_room">Match</InputLabel>
              <Select
                className={classes.formField}
                labelId="match_room"
                id="match_room"
                name="match_id"
                value={match}
                label="Favorite Team"
                onChange={handleChange}
                required
                sx={{ mb: 3 }}
                MenuProps={MenuProps}
              >
                {!isPending &&
                  availableMatches.live_matches.map((match) => (
                    <MenuItem key={match.id} value={match.id}>
                      <CreateNewRoomMenuItem
                        matchType="Live"
                        team1Logo={match.team1.logo}
                        team2Logo={match.team2.logo}
                      />
                    </MenuItem>
                  ))}

                {!isPending &&
                  availableMatches.upcoming_matches.map((match) => (
                    <MenuItem key={match.id} value={match.id}>
                      <CreateNewRoomMenuItem
                        matchType="Upcoming"
                        team1Logo={match.team1.logo}
                        team2Logo={match.team2.logo}
                      />
                    </MenuItem>
                  ))}
              </Select>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleClick}
                sx={{ mt: 3, mb: 2 }}
              >
                Create Room
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <CreateRoomSnackbar
        open={snackbarOpen}
        handleClose={handleCloseSnackbar}
      />
    </div>
  );
}

export default CreateNewRoom;
