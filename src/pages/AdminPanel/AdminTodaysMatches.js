import { useState, useEffect } from "react";
import { Grid, Typography, Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";

import AdminNavBar from "../../components/AdminPanel/AdminNavBar";
import AdminTodaysMatchCard from "../../components/AdminPanel/AdminTodaysMatchCard";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: "40px !important",
  },
  roomContent: {
    minWidth: "100%",
  },

  roomsContainer: {
    maxWidth: "1140px !important",
  },
});

function AdminTodaysMatches() {
  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status && login_status.login) {
    if (login_status.is_admin) {
      const token = login_status.token;
      config = { headers: { Authorization: `Bearer ${token}` } };
    } else {
      history.push("/");
    }
  } else {
    history.push("/login");
  }

  const classes = useStyles();

  const [isPending, setIsPending] = useState(true);
  const [todaysMatches, setTodaysMatches] = useState(null);

  async function getTodaysMatches() {
    try {
      const response = await axios.get(
        getAPIBaseURL() + "/admin/match/today",
        config
      );
      const todays_matches_data = response.data;
      setTodaysMatches(todays_matches_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getTodaysMatches();
    setIsPending(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <AdminNavBar>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isPending}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid item xs={12} container direction="row" sx={{ mt: 4, ml: 1 }}>
          <Grid item xs={12}>
            <Typography className={classes.pageTitle} sx={{ ml: 2 }}>
              Today's Matches
            </Typography>
          </Grid>

          {!isPending && (
            <Grid
              item
              xs={12}
              container
              className={classes.roomContent}
              direction="row"
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="center"
                className={classes.roomsContainer}
                sx={{ mx: 2 }}
              >
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent="flex-end"
                  sx={{ mb: 2 }}
                ></Grid>

                {todaysMatches.map((match) => (
                  <AdminTodaysMatchCard
                    key={match.id}
                    config={config}
                    matchID={match.id}
                    kickOff={match.kick_off}
                    competition={match.competition.name}
                    team1={match.team1.name}
                    team1Logo={match.team1.logo}
                    team1Score={match.team1_score}
                    team2={match.team2.name}
                    team2Logo={match.team2.logo}
                    team2Score={match.team2_score}
                    getTodaysMatches={getTodaysMatches}
                  />
                ))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </AdminNavBar>
    </div>
  );
}

export default AdminTodaysMatches;
