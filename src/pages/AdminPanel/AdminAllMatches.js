import { useState, useEffect } from "react";
import { Grid, Typography, Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import AdminNavBar from "../../components/AdminPanel/AdminNavBar";
import AdminMatchCard from "../../components/AdminPanel/AdminMatchCard";
import AdminAddMatch from "../../components/AdminPanel/AdminAddMatch";

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

function AdminAllMatches() {
  const classes = useStyles();
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login || !login_status.is_admin) {
    history.push("/");
  }

  const token = login_status.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [isPending, setIsPending] = useState(true);
  const [allMatches, setAllMatches] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { data: createMatchOptions, isPending: isOptionsPending } =
    useAxiosFetch(getAPIBaseURL() + "/admin/match/create_options");

  async function getAllMatches() {
    try {
      const response = await axios.get(
        getAPIBaseURL() + "/admin/match/all",
        config
      );
      const all_matches_data = response.data;
      setAllMatches(all_matches_data);
      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllMatches();
  }, []);

  return (
    <div>
      <AdminNavBar>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid item xs={12} container direction="row" sx={{ mt: 4, ml: 1 }}>
          <Grid item xs={12}>
            <Typography className={classes.pageTitle} sx={{ ml: 2 }}>
              All Matches
            </Typography>
          </Grid>

          {!isPending && !isOptionsPending && (
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
                >
                  <AdminAddMatch
                    config={config}
                    matchOptions={createMatchOptions}
                    getAllMatches={getAllMatches}
                    handleClose={handleClose}
                  />
                </Grid>

                {allMatches.map((match) => (
                  <AdminMatchCard
                    key={match.id}
                    matchDay={match.match_day}
                    kickOff={match.kick_off}
                    competition={match.competition.name}
                    stadium={match.stadium}
                    team1={match.team1.name}
                    team1Logo={match.team1.logo}
                    team2={match.team2.name}
                    team2Logo={match.team2.logo}
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

export default AdminAllMatches;
