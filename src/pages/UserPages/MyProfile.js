import { useState, useEffect } from "react";
import { Grid, Button, Badge, Typography, Avatar } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";

import UserNavBar from "../../components/NavBar/UserNavBar";
import UserInfo from "../../components/NavBar/UserInfo";
import LiveRoomCard from "../../components/Rooms/LiveRoomCard";
import ChangeProfilePicture from "../../components/User/ChangeProfilePicture";
import ChangeCoverPhoto from "../../components/User/ChangeCoverPhoto";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 55,
  height: 65,
}));

const useStyles = makeStyles({
  userCover: {
    height: "60vh",
  },
  userName: {
    fontSize: 30,
    fontWeight: 800,
    color: "#fff !important",
  },
  userImage: {
    height: 200,
    width: 200,
    // border: "5px solid",
    // borderColor: "#fff",
  },
  roomsContainer: {
    maxWidth: 1140,
  },
  roomContent: {
    minWidth: "100%",
  },
  bodyTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 500,
  },
});

function MyProfile() {
  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }

  const classes = useStyles();

  const [isLoaded, setIsLoaded] = useState(false);
  const [myProfileData, setMyProfileData] = useState(null);
  const [myLiveRooms, setMyLiveRooms] = useState(null);

  async function getMyProfileData() {
    try {
      let response = await axios.get(
        `http://localhost:8000/user/my_profile`,
        config
      );
      let my_profile_data = response.data;
      setMyProfileData(my_profile_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getMyLiveRooms() {
    try {
      let response = await axios.get(
        `http://localhost:8000/room/my_rooms`,
        config
      );
      let my_live_rooms = response.data;
      setMyLiveRooms(my_live_rooms);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getMyProfileData();
    await getMyLiveRooms();
    setIsLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const NavBarContent = (
    <Grid
      className={classes.userCover}
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
    >
      {isLoaded && (
        <Grid item xs={8} lg={6} sx={{ mb: 5 }}>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-end"
          >
            <Grid item xs={12} md={5}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <SmallAvatar
                    alt="user_fav_team"
                    src={myProfileData.fav_team.logo}
                  />
                }
              >
                <Badge
                  overlap="circular"
                  badgeContent={
                    <ChangeProfilePicture getMyProfileData={getMyProfileData} />
                  }
                  color="warning"
                >
                  <Avatar
                    alt="user_profile_picture"
                    src={myProfileData.profile_picture}
                    className={classes.userImage}
                  />
                </Badge>
              </Badge>
            </Grid>

            <Grid item xs={12} md={5} sx={{ ml: 2, mt: 3 }}>
              <Typography className={classes.userName}>
                {myProfileData.username}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}

      <ChangeCoverPhoto getMyProfileData={getMyProfileData} />
    </Grid>
  );

  return (
    <div>
      {isLoaded && (
        <div style={{ backgroundColor: "#1a1e25 " }}>
          <UserNavBar
            NavBarContent={NavBarContent}
            dontShowProfileIcon={true}
            coverPhoto={myProfileData.cover_photo}
          />
          <UserInfo
            bio={myProfileData.bio}
            followingCount={myProfileData.following.length}
            followersCount={myProfileData.follower.length}
            getMyProfileData={getMyProfileData}
            isMyProfile={true}
          />

          <Grid
            container
            className={classes.roomContent}
            direction="row"
            justifyContent="center"
          >
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className={classes.roomsContainer}
              sx={{ mx: 2, mt: 5 }}
            >
              <Grid item xs={12} container sx={{ mb: 5 }}>
                <Grid
                  item
                  xs={7}
                  container
                  direction="row"
                  alignItems="center"
                  className={classes.bodyTitle}
                >
                  <CircleIcon style={{ fill: "#ee1e46" }} sx={{ mr: 1 }} />
                  Live Rooms
                </Grid>
              </Grid>

              {myLiveRooms.map((room) => (
                <LiveRoomCard
                  roomName={room.name}
                  roomID={room.id}
                  roomCreator={room.creator.username}
                  roomCreatorID={room.creator_id}
                  roomCurrentCapacity={room.current_participants_number}
                  team1Logo={room.matchroom.team1.logo}
                  team2Logo={room.matchroom.team2.logo}
                />
              ))}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
