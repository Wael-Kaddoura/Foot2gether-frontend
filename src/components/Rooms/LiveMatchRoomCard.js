import { useState, useEffect } from "react";
import { Card, Grid, Typography, Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import videoRoomsFirebase from "../../server/firebase-videoRooms/firebase";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05) !important",
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  roomName: {
    color: "#fff !important",
    fontSize: "22px !important",
    fontWeight: "700 !important",
    textAlign: "center",
  },
  joinBtn: {
    color: "#fff !important",
    backgroundColor: "#ee1e46 !important",
    borderColor: "#ee1e46 !important",
    fontSize: "16px !important",
    fontWeight: "700 !important",
  },
  roomDetailsTitle: {
    color: "#fff !important",
    fontSize: "18px !important",
    fontWeight: "300 !important",
    textAlign: "center",
  },
  roomDetails: {
    color: "#fff !important",
    fontSize: "17px !important",
    fontWeight: "300 !important",
    textAlign: "center",
  },
}));

function LiveMatchRoomCard(props) {
  const { roomName, roomID, roomCreator, roomCreatorID } = props;

  const classes = useStyles();
  const [participantsNumber, setParticipantsNumber] = useState(0);

  //getting current number of participants in the room
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
    <Grid item xs={12} sx={{ mb: 5 }}>
      <Card
        className={classes.card}
        sx={{ maxWidth: 1140, minHeight: 176, maxHeight: 176, mb: 5, mx: 2 }}
      >
        <Grid
          sx={{ minHeight: 176 }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={4} md={2}>
              <Typography className={classes.roomName}>{roomName}</Typography>
            </Grid>

            <Grid item xs={3} md={1}>
              {/* <Link to={"/video_room?id=" + roomID}>
                <Button
                  className={classes.joinBtn}
                  variant="outlined"
                  color="error"
                >
                  Join
                </Button>
              </Link> */}

              <Link
                to={"/video_room?id=" + roomID}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className={classes.joinBtn}
                  variant="outlined"
                  color="error"
                >
                  Join
                </Button>
              </Link>
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
              <Link to={"/user_profile?id=" + roomCreatorID}>
                <Typography className={classes.roomDetails}>
                  {roomCreator}
                </Typography>
              </Link>
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
        </Grid>
      </Card>
    </Grid>
  );
}

export default LiveMatchRoomCard;
