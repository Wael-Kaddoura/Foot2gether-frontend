import { useState } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
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
    backgroundColor: "#1a1e25 !important",
  },
  bodyTitle: {
    color: "#fff !important",
    fontSize: 20,
    fontWeight: 500,
  },
  searchContent: {
    minWidth: "100%",
    backgroundColor: "#1a1e25 !important",
  },
});

function UserSearch() {
  const classes = useStyles();
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push("/login");
  }

  const token = login_status.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [isPending, setIsPending] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  async function searchHandler(search_term) {
    setIsPending(true);

    try {
      let response = await axios.get(
        getAPIBaseURL() + `/user/search/` + search_term,
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
      <BackdropComponent open={isPending} />

      <SecondaryNavBar />

      <Grid
        container
        className={classes.searchContent}
        direction="row"
        justifyContent="center"
        sx={{ pt: 5 }}
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
            searchResults.length ? (
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
              <UserSearchNoResults msg="There are no results found!" />
            )
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
