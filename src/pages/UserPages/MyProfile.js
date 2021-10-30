import { useState, useEffect } from "react";
import { Grid, Badge, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import axios from "axios";

import UserNavBar from "../../components/NavBar/UserNavBar";
import UserInfo from "../../components/NavBar/UserInfo";
import UserProfileTabs from "../../components/User/UserProfileTabs";
import ChangeProfilePicture from "../../components/User/ChangeProfilePicture";
import ChangeCoverPhoto from "../../components/User/ChangeCoverPhoto";
import BackdropComponent from "../../components/BackdropComponent";
import Footer from "../../components/Footer";

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

  const { username, user_profile_picture, user_cover_photo, user_bio } =
    login_status;

  const classes = useStyles();

  const [isPending, setIsPending] = useState(true);
  const [myProfileData, setMyProfileData] = useState(null);
  const [myLiveRooms, setMyLiveRooms] = useState(null);
  const [myBlogs, setMyBlogs] = useState(null);

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

  async function getMyBlogs() {
    try {
      let response = await axios.get(
        `http://localhost:8000/blog/my_blogs`,
        config
      );
      let my_blogs_data = response.data;
      setMyBlogs(my_blogs_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    await getMyProfileData();
    await getMyLiveRooms();
    await getMyBlogs();
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
                    src={user_profile_picture}
                    className={classes.userImage}
                  />
                </Badge>
              </Badge>
            </Grid>

            <Grid item xs={12} md={5} sx={{ ml: 2, mt: 3 }}>
              <Typography className={classes.userName}>{username}</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}

      <ChangeCoverPhoto getMyProfileData={getMyProfileData} />
    </Grid>
  );

  return (
    <div>
      <BackdropComponent open={isPending} />

      {!isPending && (
        <div style={{ backgroundColor: "#1a1e25 " }}>
          <UserNavBar
            NavBarContent={NavBarContent}
            coverPhoto={user_cover_photo}
          />

          <UserInfo
            bio={user_bio}
            followingCount={myProfileData.following.length}
            followersCount={myProfileData.follower.length}
            getMyProfileData={getMyProfileData}
            isMyProfile={true}
          />

          <UserProfileTabs
            username={myProfileData.username}
            userLiveRooms={myLiveRooms}
            userBlogs={myBlogs}
          />

          <Footer />
        </div>
      )}
    </div>
  );
}

export default MyProfile;
