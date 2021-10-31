import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { makeStyles } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
  formTitle: {
    color: "#000000",
    fontSize: 25,
    fontWeight: 600,
  },
  formField: {
    width: "100%",
  },
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxWidth: 35,
      maxHeight: 35,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      maxWidth: 40,
      maxHeight: 40,
    },
  },
}));

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

function AdminChangeScore({
  config,
  matchID,
  team1Logo,
  team2Logo,
  getTodaysMatches,
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [team1Score, setTeam1Score] = useState("");
  const [team2Score, setTeam2Score] = useState("");

  const handleChangeTeam1Score = (event) => {
    setTeam1Score(event.target.value);
  };

  const handleChangeTeam2Score = (event) => {
    setTeam2Score(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const match_id = matchID;
    const team1_score = team1Score;
    const team2_score = team2Score;

    const data = {
      match_id,
      team1_score,
      team2_score,
    };
    setOpen(false);

    try {
      let response = await axios.put(
        "http://localhost:8000/admin/match_score",
        data,
        config
      );

      if (response.status === 200) {
        getTodaysMatches();
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
        Change Score
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
              Change Match Score:
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
              <InputLabel id="demo-simple-select-label">
                Team 1 Score
              </InputLabel>
              <Select
                className={classes.formField}
                labelId="team1_score"
                id="team1_score"
                name="team1_score"
                value={team1Score}
                label="Favorite Team"
                onChange={handleChangeTeam1Score}
                required
                sx={{ mb: 2 }}
                MenuProps={MenuProps}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>

              <InputLabel id="demo-simple-select-label">
                Team 2 Score
              </InputLabel>
              <Select
                className={classes.formField}
                labelId="team2_score"
                id="team2_score"
                name="team2_score"
                value={team2Score}
                label="Favorite Team"
                onChange={handleChangeTeam2Score}
                required
                sx={{ mb: 2 }}
                MenuProps={MenuProps}
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Score
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AdminChangeScore;
