import { useState, useEffect } from "react";
import { Card, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core";

import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";
import videoRoomsFirebase from "../../server/firebase-videoRooms/firebase";

import AdminEditRoom from "./AdminEditRoom";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.05) !important",
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  roomName: {
    color: "#000",
    fontSize: "22px !important",
    fontWeight: "700 !important",
    textAlign: "center",
  },
  roomDetailsTitle: {
    color: "#000",
    fontSize: "18px !important",
    fontWeight: "300 !important",
    textAlign: "center",
  },
  roomDetails: {
    color: "#000",
    fontSize: "17px !important",
    fontWeight: "300 !important",
    textAlign: "center",
  },
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxHeight: 38,
      maxWidth: 38,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      minHeight: 50,
      maxHeight: 50,
      maxWidth: 50,
    },
  },
}));

function AdminRoomCard(props) {
  const {
    roomName,
    roomID,
    matchRoomID,
    roomCreator,
    team1Logo,
    team2Logo,
    config,
    availableMatches,
    getTodaysRooms,
  } = props;

  const classes = useStyles();

  const deleteRoomHandler = async () => {
    try {
      let response = await axios.delete(
        getAPIBaseURL() + "/admin/room/" + roomID,
        config
      );

      if (response.status === 200) {
        getTodaysRooms();
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [participantsNumber, setParticipantsNumber] = useState(0);

  useEffect(() => {
    var firepadRef = videoRoomsFirebase
      .database()
      .ref()
      .child(roomID)
      .child("participants");

    firepadRef.on("value", (snap) => {
      setParticipantsNumber(snap.numChildren());
    });
  }, []);

  return (
    <Grid item xs={12} sx={{ mb: 1 }}>
      <Card
        className={classes.card}
        sx={{ maxWidth: 1140, minHeight: 120, mb: 1, mx: 2, pb: 2 }}
      >
        <Grid item xs={12} container justifyContent="flex-end" sx={{ mt: 1 }}>
          <AdminEditRoom
            config={config}
            availableMatches={availableMatches}
            getTodaysRooms={getTodaysRooms}
            roomID={roomID}
            oldRoomName={roomName}
            oldMatchRoomID={matchRoomID}
          />
          <DeleteIcon
            onClick={deleteRoomHandler}
            sx={{ mr: 1, ml: 2 }}
            style={{ fill: "red" }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Grid item xs={4} md={2}>
            <Typography className={classes.roomName}>{roomName}</Typography>
          </Grid>

          <Grid item xs={4} sm={2} className={classes.vs} sx={{ mr: 5 }}>
            <img className={classes.teamLogo} src={team1Logo} alt="team1" />

            <img className={classes.teamLogo} src={team2Logo} alt="team2" />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={4}>
            <Typography className={classes.roomDetailsTitle}>
              Room ID:
            </Typography>
            <Typography className={classes.roomDetails}>{roomID}</Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography className={classes.roomDetailsTitle}>
              Created By:
            </Typography>
            <Typography className={classes.roomDetails}>
              {roomCreator}
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Typography className={classes.roomDetailsTitle}>
              Current:
            </Typography>
            <Typography className={classes.roomDetails}>
              {participantsNumber}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default AdminRoomCard;
