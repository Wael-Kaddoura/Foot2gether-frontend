import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import AdminNavBar from "../../components/AdminPanel/AdminNavBar";
import AdminRoomCard from "../../components/AdminPanel/AdminRoomCard";
import AdminCreateRoom from "../../components/AdminPanel/AdminCreateRoom";
import BackdropComponent from "../../components/BackdropComponent";

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

  //check user login status & type
  let config = "";
  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login || !login_status.is_admin) {
    history.push("/");
  } else {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  }

  const [isPending, setIsPending] = useState(true);
  const [todaysRooms, setTodaysRooms] = useState(null);

  const { data: availableMatches, isPending: isMatchesPending } = useAxiosFetch(
    getAPIBaseURL() + "/match/available"
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
        <BackdropComponent open={isPending || isMatchesPending} />

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
                    setIsPending={setIsPending}
                  />
                </Grid>

                {todaysRooms.map((room) => (
                  <AdminRoomCard
                    key={room.id}
                    roomName={room.name}
                    roomID={room.id}
                    roomCreator={room.creator.username}
                    matchRoomID={room.matchroom.id}
                    team1Logo={room.matchroom.team1.logo}
                    team2Logo={room.matchroom.team2.logo}
                    config={config}
                    availableMatches={availableMatches}
                    getTodaysRooms={getTodaysRooms}
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
