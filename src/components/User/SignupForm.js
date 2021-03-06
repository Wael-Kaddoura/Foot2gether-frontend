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
import { Link } from "react-router-dom";

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
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: "100%",
    height: "100vh !important",
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

function SignupForm(props) {
  const {
    signUpError,
    setSignUpError,
    emailUsedError,
    setEmailUsedError,
    usernameUsedError,
    setUsernameUsedError,
    passwordMatch,
    favTeam,
    teamsData,
    isPending,
    handleChange,
    handleSubmit,
  } = props;

  const classes = useStyles();

  return (
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
            {!isPending &&
              teamsData.map((team) => (
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

          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup row aria-label="gender" name="gender" defaultValue="0">
            <FormControlLabel
              value="0"
              control={<Radio />}
              label={<Typography style={{ color: "#212529" }}>Male</Typography>}
            />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label={
                <Typography style={{ color: "#212529" }}>Female</Typography>
              }
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label={
                <Typography style={{ color: "#212529" }}>Other</Typography>
              }
            />
          </RadioGroup>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
          >
            Sign Up
          </Button>
        </Box>

        <Grid container justifyContent="space-between">
          <Typography style={{ color: "#212529" }}>
            Already have an account?
          </Typography>

          <Link to={"/login"} style={{ color: "#1976d2" }}>
            Log in
          </Link>
        </Grid>
      </Box>
    </Grid>
  );
}

export default SignupForm;
