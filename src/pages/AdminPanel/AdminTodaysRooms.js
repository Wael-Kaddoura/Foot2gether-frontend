import { useState, useEffect } from "react";
import { Grid, Typography, Backdrop, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import AdminNavBar from "../../components/AdminPanel/AdminNavBar";
import AdminRoomCard from "../../components/AdminPanel/AdminRoomCard";
import AdminCreateRoom from "../../components/AdminPanel/AdminCreateRoom";

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

function AdminTodaysRooms() {
  const classes = useStyles();
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login || !login_status.is_admin) {
    history.push("/");
  }

  const token = login_status.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [isPending, setIsPending] = useState(true);
  const [todaysRooms, setTodaysRooms] = useState(null);

  const { data: availableMatches, isPending: isMatchesPending } = useAxiosFetch(
    getAPIBaseURL() + "/admin/match/available"
  );

  async function getTodaysRooms() {
    try {
      const response = await axios.get(
        getAPIBaseURL() + "/admin/room/today",
        config
      );
      const todays_rooms_data = response.data;
      setTodaysRooms(todays_rooms_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getTodaysRooms();
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
          open={isPending || isMatchesPending}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Grid item xs={12} container direction="row" sx={{ mt: 4, ml: 1 }}>
          <Grid item xs={12}>
            <Typography className={classes.pageTitle} sx={{ ml: 2 }}>
              Today's Rooms
            </Typography>
          </Grid>

          {!isPending && !isMatchesPending && (
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
                  <AdminCreateRoom
                    config={config}
                    availableMatches={availableMatches}
                    getTodaysRooms={getTodaysRooms}
                  />
                </Grid>

                {todaysRooms.map((room) => (
                  <AdminRoomCard
                    key={room.id}
                    roomName={room.name}
                    roomID={room.id}
                    roomCreator={room.creator.username}
                    team1Logo={room.matchroom.team1.logo}
                    team2Logo={room.matchroom.team2.logo}
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

export default AdminTodaysRooms;
