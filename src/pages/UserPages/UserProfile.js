import { useState, useEffect } from "react";
import { Grid, Button, Badge, Typography, Avatar } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

import UserNavBar from "../../components/NavBar/UserNavBar";
import UserInfo from "../../components/NavBar/UserInfo";
import LiveRoomCard from "../../components/Rooms/LiveRoomCard";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 55,
  height: 65,
}));

const useStyles = makeStyles({
  followBtn: {
    color: "#fff",
    backgroundColor: "#ee1e46",
    borderColor: "#ee1e46",
  },
  unfollowBtn: {
    color: "#fff",
    backgroundColor: "#bf1737",
    borderColor: "#bf1737",
  },
  userCover: {
    height: "60vh",
  },
  userName: {
    fontSize: 30,
    fontWeight: 800,
    color: "#fff",
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

function UserProfile() {
  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status && login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }

  const classes = useStyles();

  const user_id = new URLSearchParams(useLocation().search).get("id");

  const [isPending, setIsPending] = useState(true);
  const [userData, setUserData] = useState(null);
  const [userLiveRooms, setUserLiveRooms] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  async function followUser() {
    try {
      let response = await axios.post(
        `http://localhost:8000/user/follow`,
        { followed_user_id: user_id },
        config
      );
      console.log(response.data.message);
      setIsFollowed(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function unFollowUser() {
    try {
      let response = await axios.post(
        `http://localhost:8000/user/unfollow`,
        { unfollowed_user_id: user_id },
        config
      );
      console.log(response.data.message);
      setIsFollowed(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserData() {
    try {
      let response = await axios.get(
        `http://localhost:8000/user/` + user_id,
        config
      );
      let user_data = response.data.user_data;
      let is_followed = response.data.is_followed;

      setUserData(user_data);
      setIsFollowed(is_followed);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserLiveRooms() {
    try {
      let response = await axios.get(
        `http://localhost:8000/room/user/` + user_id,
        config
      );
      let user_live_rooms_data = response.data;

      setUserLiveRooms(user_live_rooms_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getUserData();
    await getUserLiveRooms();
    setIsPending(false);
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
      {!isPending && (
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
                    src={userData.fav_team.logo}
                  />
                }
              >
                <Avatar
                  alt="user_profile_picture"
                  src={userData.profile_picture}
                  className={classes.userImage}
                />
              </Badge>
            </Grid>

            <Grid item xs={12} md={5} sx={{ ml: 2, mt: 3 }}>
              <Typography className={classes.userName}>
                {userData.username}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item xs={4} sm={1} sx={{ mb: 8 }}>
        {isFollowed ? (
          <Button
            className={classes.unfollowBtn}
            onClick={unFollowUser}
            variant="outlined"
            color="inherit"
          >
            Unfollow
          </Button>
        ) : (
          <Button
            className={classes.followBtn}
            onClick={followUser}
            variant="outlined"
            color="error"
          >
            Follow
          </Button>
        )}
      </Grid>
    </Grid>
  );
  return (
    <div>
      <BackdropComponent open={isPending} />

      {!isPending && (
        <div style={{ backgroundColor: "#1a1e25 " }}>
          <UserNavBar
            NavBarContent={NavBarContent}
            coverPhoto={userData.cover_photo}
          />
          <UserInfo
            followingCount={userData.following.length}
            followersCount={userData.follower.length}
            bio={userData.bio}
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

              {userLiveRooms.map((room) => (
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

      <Footer />
    </div>
  );
}

export default UserProfile;
