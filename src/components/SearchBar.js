import { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";

export default function SearchBar({ searchHandler }) {
  const [searchField, setSearchField] = useState("initialState");

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.45)" }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Room by ID"
          inputProps={{ "aria-label": "Search Room by ID" }}
          onChange={handleChange}
        />
        <IconButton
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={() => searchHandler(searchField)}
        >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    </Grid>
  );
}
