import { useState } from "react";
import { Grid, Typography, TextField, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles({
  sectionTitle: {
    color: "#fff",
    fontSize: "28px !important",
    fontWeight: "500 !important",
  },
  multilineColor: {
    color: "#fff !important",
    backgroundColor: "rgba(255, 255, 255, 0.05) !important",
    maxLength: 12,
  },
});

function BlogNewComment({ blog_id, getCommentsData, config }) {
  const classes = useStyles();

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const new_comment_data = new FormData(event.currentTarget);
    const body = new_comment_data.get("new_comment");

    const data = {
      body,
      blog_id,
    };

    setValue("");

    try {
      let response = await axios.post(
        "http://localhost:8000/blog/comment",
        data,
        config
      );

      if (response.status === 201) {
        getCommentsData();
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid sx={{ mt: 5 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography className={classes.sectionTitle}>
          Leave a comment:
        </Typography>

        <TextField
          id="new_comment"
          name="new_comment"
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
          variant="filled"
          color="primary"
          placeholder="New Comment..."
          InputProps={{ className: classes.multilineColor }}
          inputProps={{ maxLength: 250 }}
          style={{ width: "100%" }}
          sx={{ my: 4 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Post Comment
        </Button>
      </Box>
    </Grid>
  );
}

export default BlogNewComment;
