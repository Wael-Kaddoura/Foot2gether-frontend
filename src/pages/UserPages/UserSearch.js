import { useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";

import SecondaryNavBar from "../../components/NavBar/SecondaryNavBar";
import UserSearchBar from "../../components/User/UserSearchBar";
import UserSearchNoResults from "../../components/User/UserSearchNoResults";
import UserCard from "../../components/User/UserCard";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "50px !important",
    fontWeight: 700,
  },
  usersContainer: {
    maxWidth: "800px !important",
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
  if (login_status && login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }

  const classes = useStyles();

  const [isPending, setIsPending] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  async function searchHandler(search_word) {
    setIsPending(true);
    try {
      let response = await axios.get(
        `http://3.144.252.18/user/search/` + search_word,
        config
      );

      let search_results = response.data;
      setSearchResults(search_results);

      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <SecondaryNavBar />

      <BackdropComponent open={isPending} />

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

          {searchResults ? (
            searchResults.map((result) => (
              <UserCard
                key={result.id}
                userID={result.id}
                username={result.username}
                userPP={result.profile_picture}
                userFavTeamLogo={result.fav_team.logo}
                followersCount={result.follower.length}
                is_followed={result.is_followed}
              />
            ))
          ) : (
            <UserSearchNoResults />
          )}
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default UserSearch;
