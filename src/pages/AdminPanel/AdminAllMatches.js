import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

import AdminNavBar from "../../components/AdminPanel/AdminNavBar";
import AdminMatchCard from "../../components/AdminPanel/AdminMatchCard";
import AdminAddMatch from "../../components/AdminPanel/AdminAddMatch";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: 40,
  },
  roomContent: {
    minWidth: "100%",
  },

  roomsContainer: {
    maxWidth: 1140,
  },
});

function AdminAllMatches() {
  const classes = useStyles();

  const [isPending, setIsPending] = useState(true);
  const [allMatches, setAllMatches] = useState(null);
  const [createMatchOptions, setCreateMatchOptions] = useState(null);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  async function getAllMatches() {
    try {
      const response = await axios.get("http://localhost:8000/admin/match/all");
      const all_matches_data = response.data;
      setAllMatches(all_matches_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCreateMatchOptions() {
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/match/create_options"
      );
      const create_match_opitons_data = response.data;
      setCreateMatchOptions(create_match_opitons_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getAllMatches();
    await getCreateMatchOptions();
    handleClose();
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
                >
                  <AdminAddMatch
                    matchOptions={createMatchOptions}
                    getAllMatches={getAllMatches}
                  />
                </Grid>

                {allMatches.map((match) => (
                  <AdminMatchCard
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
