import Overlay from "../components/NavBar/Overlay";
import { Grid, Box, Button, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

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
});

function Login() {
  const classes = useStyles();

  const login_form = (
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
          Login
        </Typography>
        <Box component="form" sx={{ mb: 5 }}>
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
        </Box>

        <Grid container justifyContent="space-between">
          <Link to={"/signup"} style={{ color: "blue" }}>
            Create Account
          </Link>

          <Button variant="contained" color="success">
            Login
          </Button>
        </Grid>
      </Box>
    </Grid>
  );

  return <Overlay NavBarContent={login_form} />;
}

export default Login;
