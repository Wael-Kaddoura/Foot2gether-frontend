import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import CreateNewRoomMenuItem from "./CreateNewRoomMenuItem";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";

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

function CreateNewRoom() {
  const history = useHistory();
  const classes = useStyles();

  const token = JSON.parse(localStorage.getItem("login")).token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [match, setMatch] = React.useState("");

  const [isLoaded, setIsLoaded] = useState(false);
  const [availableMatches, setAvailableMatches] = useState(null);

  async function getAvailableMatches() {
    try {
      let response = await axios.get(`http://localhost:8000/match/available`);
      let available_matches_data = response.data;
      setAvailableMatches(available_matches_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getAvailableMatches();
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

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

    try {
      console.log(config);
      let response = await axios.post(
        "http://localhost:8000/room",
        data,
        config
      );

      if (response.status === 201) {
        console.log("Successfully Created Room!");
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
                {isLoaded &&
                  availableMatches.map((match) => (
                    <MenuItem value={match.id}>
                      <CreateNewRoomMenuItem
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
                color="success"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Room
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CreateNewRoom;
