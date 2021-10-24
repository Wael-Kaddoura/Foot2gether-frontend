import { useState } from "react";
import { Grid } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { makeStyles } from "@mui/styles";
import SecondaryNavBar from "../components/NavBar/SecondaryNavBar";
import UserSearchBar from "../components/User/UserSearchBar";
import UserCard from "../components/User/UserCard";
import { useHistory } from "react-router-dom";

import axios from "axios";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
    fontWeight: 700,
  },
  usersContainer: {
    maxWidth: 800,
  },
  bodyTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
  },
  searchContent: {
    minWidth: "100%",
  },
});

function UserSearch() {
  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }

  const classes = useStyles();

  const [searchResults, setSearchResults] = useState(null);

  async function searchHandler(search_word) {
    try {
      let response = await axios.get(
        `http://localhost:8000/user/search/` + search_word,
        config
      );
      let search_results = response.data;
      console.log(search_results);
      setSearchResults(search_results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <SecondaryNavBar />

      <Grid
        container
        className={classes.searchContent}
        direction="row"
        justifyContent="center"
        sx={{ mt: 5 }}
      >
        <Grid
          item
          xs={12}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.usersContainer}
          sx={{ mt: 5, mx: 2 }}
        >
          <Grid item xs={12} container justifyContent="center" sx={{ mb: 5 }}>
            <UserSearchBar searchHandler={searchHandler} />
          </Grid>

          {searchResults &&
            searchResults.map((result) => (
              <UserCard
                username={result.username}
                userPP={result.profile_picture}
                userFavTeamLogo={result.fav_team.logo}
                followersCount={result.follower.length}
              />
            ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default UserSearch;
