import { useState } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  sectionTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: 500,
  },
  multilineColor: {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    maxLength: 12,
  },
  showRoomBtn: {
    color: "#fff",
    backgroundColor: "#ee1e46",
    borderColor: "#ee1e46",
  },
});

function BlogNewComment() {
  const classes = useStyles();

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Grid sx={{ mt: 5 }}>
      <Typography className={classes.sectionTitle}>Leave a comment:</Typography>
      <TextField
        id="filled-multiline-flexible"
        multiline
        maxRows={4}
        value={value}
        onChange={handleChange}
        variant="filled"
        color="error"
        placeholder="New Comment..."
        InputProps={{ className: classes.multilineColor }}
        inputProps={{ maxLength: 250 }}
        style={{ width: "100%" }}
        sx={{ my: 4 }}
      />
      <Button className={classes.showRoomBtn} variant="outlined" color="error">
        Post Comment
      </Button>
    </Grid>
  );
}

export default BlogNewComment;
