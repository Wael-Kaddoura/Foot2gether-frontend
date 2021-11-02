import React, { useState } from "react";
import {
  Grid,
  Stack,
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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TimePicker from "@mui/lab/TimePicker";
import { makeStyles } from "@material-ui/core";
import date from "date-and-time";
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

const useStyles = makeStyles((theme) => ({
  formTitle: {
    color: "#000000",
    fontSize: "25px !important",
    fontWeight: "600 !important",
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

function AdminAddMatch({ config, matchOptions, getAllMatches }) {
  const classes = useStyles();
  const competitions = matchOptions.competitions;
  const teams = matchOptions.teams;

  const [open, setOpen] = useState(false);
  const [matchDay, setMatchDay] = useState(new Date("2021-10-18T21:11:54"));
  const [kickOff, setKickOff] = useState(new Date("2021-10-18T21:11:54"));
  const [fulltime, setFulltime] = useState(new Date("2021-10-18T21:11:54"));
  const [competitionID, setCompetitionID] = useState("");
  const [team1ID, setTeam1ID] = useState("");
  const [team2ID, setTeam2ID] = useState("");

  const handleChangeMatchDay = (newValue) => {
    setMatchDay(newValue);
  };

  const handleChangeKickOff = (newValue) => {
    setKickOff(newValue);
  };

  const handleChangeFulltime = (newValue) => {
    setFulltime(newValue);
  };
  const handleChangeCompetition = (event) => {
    setCompetitionID(event.target.value);
  };

  const handleChangeTeam1 = (event) => {
    setTeam1ID(event.target.value);
  };

  const handleChangeTeam2 = (event) => {
    setTeam2ID(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const new_match_data = new FormData(event.currentTarget);
    const match_day = date
      .format(matchDay, "YYYY-MM-DD HH:mm:ss")
      .substring(0, 10);
    const kick_off = date.format(kickOff, "YYYY-MM-DD HH:mm:ss").substring(11);
    const full_time = date
      .format(fulltime, "YYYY-MM-DD HH:mm:ss")
      .substring(11);
    const competition_id = competitionID;
    const stadium = new_match_data.get("stadium");
    const team1_id = team1ID;
    const team2_id = team2ID;

    const data = {
      match_day,
      kick_off,
      full_time,
      competition_id,
      stadium,
      team1_id,
      team2_id,
    };

    setOpen(false);

    try {
      let response = await axios.post(
        "http://3.144.252.18/admin/match",
        data,
        config
      );

      if (response.status === 200) {
        getAllMatches();
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
        Add New Match
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
              Add New Match:
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
              <InputLabel id="match_room">Competition</InputLabel>
              <Select
                className={classes.formField}
                labelId="competition_id"
                id="competition_id"
                name="competition_id"
                value={competitionID}
                label="Favorite Team"
                onChange={handleChangeCompetition}
                required
                sx={{ mb: 2 }}
                MenuProps={MenuProps}
              >
                {competitions.map((competition) => (
                  <MenuItem key={competition.id} value={competition.id}>
                    {competition.name}
                  </MenuItem>
                ))}
              </Select>

              <InputLabel id="match_room">Team 1</InputLabel>
              <Select
                className={classes.formField}
                labelId="team1_id"
                id="team1_id"
                name="team1_id"
                value={team1ID}
                label="Favorite Team"
                onChange={handleChangeTeam1}
                required
                sx={{ mb: 2 }}
                MenuProps={MenuProps}
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    <Grid container alignItems="center">
                      <Grid item xs={2} container justifyContent="center">
                        <img
                          src={team.logo}
                          className={classes.teamLogo}
                          alt={team.name}
                        />
                      </Grid>

                      <Grid item xs={10}>
                        <Typography sx={{ ml: 3 }} style={{ color: "#000000" }}>
                          {team.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>

              <InputLabel id="match_room">Team 2</InputLabel>
              <Select
                className={classes.formField}
                labelId="team2_id"
                id="team2_id"
                name="team2_id"
                value={team2ID}
                label="Favorite Team"
                onChange={handleChangeTeam2}
                required
                sx={{ mb: 2 }}
                MenuProps={MenuProps}
              >
                {teams.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    <Grid container alignItems="center">
                      <Grid item xs={2} container justifyContent="center">
                        <img
                          src={team.logo}
                          className={classes.teamLogo}
                          alt={team.name}
                        />
                      </Grid>

                      <Grid item xs={10}>
                        <Typography sx={{ ml: 3 }} style={{ color: "#000000" }}>
                          {team.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>

              <TextField
                className={classes.formField}
                sx={{ mb: 2 }}
                required
                id="outlined-required"
                label="Stadium"
                placeholder="Stadium"
                name="stadium"
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={2}>
                  <DesktopDatePicker
                    className={classes.formField}
                    label="Match Day"
                    inputFormat="MM/dd/yyyy"
                    value={matchDay}
                    onChange={handleChangeMatchDay}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <TimePicker
                    className={classes.formField}
                    label="Kick Off"
                    value={kickOff}
                    onChange={handleChangeKickOff}
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <TimePicker
                    className={classes.formField}
                    label="Full Time"
                    value={fulltime}
                    onChange={handleChangeFulltime}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Match
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AdminAddMatch;
