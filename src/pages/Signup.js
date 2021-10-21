import Overlay from "../components/NavBar/Overlay";
import { useState } from "react";
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
import team1Img from "../Images/manchester_city.png";
import team2Img from "../Images/manchester_united.png";

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
      width: 35,
      height: 35,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      width: 40,
      height: 40,
    },
  },
}));

function Signup() {
  const classes = useStyles();

  const [favTeam, setFavTeam] = useState("");

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
            <MenuItem value={10}>
              <img src={team2Img} className={classes.teamLogo} alt="t2" />
              <Typography sx={{ ml: 3 }}>Manchester United</Typography>
            </MenuItem>
            <MenuItem value={30}>
              <img src={team1Img} className={classes.teamLogo} alt="t2" />
              <Typography sx={{ ml: 3 }}>Manchester City</Typography>
            </MenuItem>
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
