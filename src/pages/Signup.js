import Overlay from "../components/NavBar/Overlay";
import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
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
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  formTitle: {
    color: "#000000 !important",
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

function Signup() {
  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [teamsData, setTeamsData] = useState(null);
  const [favTeam, setFavTeam] = useState("");

  async function getTeamsData() {
    try {
      let response = await axios.get(`http://localhost:8000/team`);
      let teams_data = response.data;
      setTeamsData(teams_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getTeamsData();
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setFavTeam(event.target.value);
  };
  const signup_form = (
    <Grid
      container
      className={classes.mainContainer}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={style} style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
        <Typography
          id="transition-modal-title"
          className={classes.formTitle}
          sx={{ mb: 5 }}
          style={{ textAlign: "center" }}
        >
          Create a New Account
        </Typography>

        <Box component="form" sx={{ mb: 5 }}>
          <TextField
            className={classes.formField}
            sx={{ mb: 3 }}
            required
            id="outlined-basic"
            label="Username"
            placeholder="Username"
          />

          <TextField
            className={classes.formField}
            sx={{ mb: 3 }}
            required
            id="outlined-basic"
            label="Email"
            placeholder="Email"
          />

          <TextField
            className={classes.formField}
            id="outlined-password-input"
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            sx={{ mb: 3 }}
          />

          <TextField
            className={classes.formField}
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            required
            autoComplete="current-password"
            sx={{ mb: 3 }}
          />

          <InputLabel id="demo-simple-select-label">Favorite Team</InputLabel>
          <Select
            className={classes.formField}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={favTeam}
            label="Favorite Team"
            onChange={handleChange}
            sx={{ mb: 3 }}
          >
            {isLoaded &&
              teamsData.map((team) => (
                <MenuItem value={team.id}>
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

          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </Box>

        <Grid container justifyContent="space-between">
          <Link to={"/signup"} style={{ color: "blue" }}></Link>

          <Button variant="contained" color="success">
            Sign Up
          </Button>
        </Grid>
      </Box>
    </Grid>
  );

  return <Overlay NavBarContent={signup_form} />;
}

export default Signup;
