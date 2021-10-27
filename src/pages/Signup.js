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
  Alert,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

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
  passwordError: {
    color: "red !important",
  },
}));

function Signup() {
  const history = useHistory();

  //check if user already logged in
  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status.login) {
    if (login_status.is_admin) {
      history.push("/admin/home");
    } else {
      history.push("/home");
    }
  }

  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [teamsData, setTeamsData] = useState(null);
  const [favTeam, setFavTeam] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signUpError, setSignUpError] = useState(false);
  const [emailUsedError, setEmailUsedError] = useState(false);
  const [usernameUsedError, setUsernameUsedError] = useState(false);

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

  const handleSubmit = async (event) => {
    setPasswordMatch(true);
    setEmailUsedError(false);
    setUsernameUsedError(false);

    event.preventDefault();
    const signup_data = new FormData(event.currentTarget);
    const username = signup_data.get("username");
    const email = signup_data.get("email");
    const password = signup_data.get("password");
    const confirm_password = signup_data.get("confirm_password");
    const fav_team_id = favTeam;
    const gender = signup_data.get("gender");

    if (password !== confirm_password) {
      setPasswordMatch(false);
    } else {
      const data = {
        username,
        email,
        password,
        confirm_password,
        fav_team_id,
        gender,
      };

      try {
        let response = await axios.post(
          "http://localhost:8000/user/signup",
          data
        );

        if (response.status === 201) {
          console.log("Successfully Signed Up!");
          setSignUpError(false);
          history.push("/login");
        } else {
          console.log("Something went wrong!");
          setSignUpError(true);
        }
      } catch (err) {
        if (err.response.status === 401) {
          console.log("Something went wrong!");
          setSignUpError(true);
        } else if (err.response.status === 409) {
          let conflict_type = err.response.data.conflict;
          if (conflict_type === "Email") {
            console.log("Email already used!");
            setEmailUsedError(true);
          } else if (conflict_type === "Username") {
            console.log("Username already used!");
            setUsernameUsedError(true);
          }
        }
        console.log(err);
      }
    }
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

        {signUpError && (
          <Alert
            severity="error"
            onClose={() => {
              setSignUpError(false);
            }}
            sx={{ mb: 2 }}
          >
            Something went wrong! Try again.
          </Alert>
        )}

        {emailUsedError && (
          <Alert
            severity="error"
            onClose={() => {
              setEmailUsedError(false);
            }}
            sx={{ mb: 2 }}
          >
            Email already used!
          </Alert>
        )}

        {usernameUsedError && (
          <Alert
            severity="error"
            onClose={() => {
              setUsernameUsedError(false);
            }}
            sx={{ mb: 2 }}
          >
            Username already used!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
          <TextField
            className={classes.formField}
            sx={{ mb: 3 }}
            required
            id="username"
            name="username"
            label="Username"
            placeholder="Username"
            inputProps={{
              minLength: 2,
            }}
          />

          <TextField
            sx={{ mb: 3 }}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputProps={{
              type: "email",
              maxLength: 100,
            }}
          />

          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ mb: 3 }}
            inputProps={{
              minLength: 6,
            }}
          />
          <TextField
            required
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            sx={{ mb: 3 }}
          />

          {!passwordMatch && (
            <Typography className={classes.passwordError} sx={{ mb: 2 }}>
              Passwords didn't match!
            </Typography>
          )}

          <InputLabel id="fav_team">Favorite Team</InputLabel>
          <Select
            className={classes.formField}
            labelId="fav_team"
            id="fav_team"
            value={favTeam}
            label="Favorite Team"
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
            MenuProps={MenuProps}
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
          <RadioGroup row aria-label="gender" name="gender" defaultValue="0">
            <FormControlLabel value="0" control={<Radio />} label="Male" />
            <FormControlLabel value="1" control={<Radio />} label="Female" />
            <FormControlLabel value="2" control={<Radio />} label="Other" />
          </RadioGroup>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>

        <Grid container justifyContent="space-between">
          Already have an account?
          <Link to={"/login"} style={{ color: "blue" }}>
            Log in
          </Link>
        </Grid>
      </Box>
    </Grid>
  );

  return <Overlay NavBarContent={signup_form} />;
}

export default Signup;
