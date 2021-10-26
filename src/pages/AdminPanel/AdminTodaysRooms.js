import { Grid, Typography, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";

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

  return (
    <div>
      <AdminNavBar>
        <Grid item xs={12} container direction="row" sx={{ mt: 4, ml: 1 }}>
          <Grid item xs={12}>
            <Typography className={classes.pageTitle} sx={{ ml: 2 }}>
              Today's Rooms
            </Typography>
          </Grid>

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
                <AdminCreateRoom />
              </Grid>

              {/* Match Card */}
              <AdminRoomCard />
              <AdminRoomCard />
              <AdminRoomCard />
              <AdminRoomCard />
              <AdminRoomCard />
              <AdminRoomCard />
              <AdminRoomCard />
              <AdminRoomCard />
              <AdminRoomCard />
              {/* Room Card */}
            </Grid>
          </Grid>
        </Grid>
      </AdminNavBar>
    </div>
  );
}

export default AdminTodaysRooms;
