import { Grid, Box, Button, Typography, TextField, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

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

function LoginForm(props) {
  const {
    isNewAccountCreatedMsg,
    isNeedLoginFirstMsg,
    loginError,
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
          Log In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Wrong Credentials! Try again.
            </Alert>
          )}

          {isNewAccountCreatedMsg && (
            <Alert variant="filled" severity="success" sx={{ mb: 2 }}>
              Account was successfully created!
            </Alert>
          )}

          {isNeedLoginFirstMsg && (
            <Alert variant="filled" severity="warning" sx={{ mb: 2 }}>
              Please Log In First!
            </Alert>
          )}

          <TextField
            sx={{ mb: 3 }}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            inputProps={{
              type: "email",
              maxLength: 100,
            }}
          />

          <TextField
            sx={{ mb: 3 }}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputProps={{
              minLength: 6,
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>

        <Grid container justifyContent="space-between">
          <Link to={"/signup"} style={{ color: "#1976d2" }}>
            Create Account
          </Link>
        </Grid>
      </Box>
    </Grid>
  );
}

export default LoginForm;
