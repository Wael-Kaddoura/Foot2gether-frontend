import { useState } from "react";
import { Grid, Paper, InputBase } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function RoomSearchBar({ searchHandler }) {
  const [searchField, setSearchField] = useState("initialState");

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchHandler(searchField);
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.45)" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Room by ID"
          inputProps={{ "aria-label": "Search Room by ID" }}
          onChange={handleChange}
        />
        <IconButton sx={{ p: "10px" }} aria-label="search" type="submit">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Grid>
  );
}
