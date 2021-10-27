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
import AdminRoomCard from "../../components/AdminPanel/AdminRoomCard";
import AdminCreateRoom from "../../components/AdminPanel/AdminCreateRoom";

const useStyles = makeStyles({
  pageTitle: {
    fontSize: 40,
    // fontWeight: 700,
  },
  roomContent: {
    minWidth: "100%",
  },

  roomsContainer: {
    maxWidth: 1140,
  },
});

function AdminTodaysRooms() {
  const classes = useStyles();

  const [isPending, setIsPending] = useState(true);
  const [todaysRooms, setTodaysRooms] = useState(null);
  const [availableMatches, setAvailableMatches] = useState(null);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  async function getTodaysRooms() {
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/room/today"
      );
      const todays_rooms_data = response.data;
      setTodaysRooms(todays_rooms_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAvailableMatches() {
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/match/available"
      );
      const available_matches_data = response.data;
      setAvailableMatches(available_matches_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getTodaysRooms();
    await getAvailableMatches();
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
              Today's Rooms
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
                // alignItems="center"
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
                    availableMatches={availableMatches}
                    getTodaysRooms={getTodaysRooms}
                  />
                </Grid>

                {todaysRooms.map((room) => (
                  <AdminRoomCard
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
