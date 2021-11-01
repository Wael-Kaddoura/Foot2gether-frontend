import { useState, useEffect } from "react";
import { Grid, Button, Badge, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import useAxiosFetch from "../../hooks/useAxiosFetch";

import UserNavBar from "../../components/NavBar/UserNavBar";
import UserInfo from "../../components/NavBar/UserInfo";
import UserProfileTabs from "../../components/User/UserProfileTabs";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 55,
  height: 65,
}));

const useStyles = makeStyles({
  unfollowBtn: {
    color: "#fff",
    backgroundColor: "#bf1737 !important",
    borderColor: "#bf1737 !important",
  },
  userCover: {
    height: "60vh",
  },
  userName: {
    fontSize: "30px !important",
    fontWeight: "800 !important",
    color: "#fff",
  },
  userImage: {
    height: "200px !important",
    width: "200px !important",
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
  let my_id = "";

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status && login_status.login) {
    const token = login_status.token;
    my_id = login_status.user_id;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }

  const classes = useStyles();

  const user_id = new URLSearchParams(useLocation().search).get("id");

  if (my_id == user_id) {
    history.push("/my_profile");
  }

  const [isPending, setIsPending] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);

  const { data: userLiveRooms, isPending: isRoomsPending } = useAxiosFetch(
    "http://localhost:8000/room/user/" + user_id
  );

  const { data: userBlogs, isPending: isBlogsPending } = useAxiosFetch(
    "http://localhost:8000/blog/user/" + user_id
  );

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

  async function followUser() {
    try {
      let response = await axios.post(
        `http://localhost:8000/user/follow`,
        { followed_user_id: user_id },
        config
      );

      await getUserData();
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

      await getUserData();
      setIsFollowed(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getUserData();
    setIsPending(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
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
            variant="contained"
            color="error"
          >
            Unfollow
          </Button>
        ) : (
          <Button onClick={followUser} variant="contained" color="error">
            Follow
          </Button>
        )}
      </Grid>
    </Grid>
  );
  return (
    <div>
      <BackdropComponent open={isPending || isRoomsPending || isBlogsPending} />

      {!isPending && !isRoomsPending && !isBlogsPending && (
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

          <UserProfileTabs
            username={userData.username}
            userLiveRooms={userLiveRooms}
            userBlogs={userBlogs}
          />

          <Footer />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
