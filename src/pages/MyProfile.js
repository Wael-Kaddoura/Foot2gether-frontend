import { useState, useEffect } from "react";
import UserNavBar from "../components/NavBar/UserNavBar";
import UserInfo from "../components/NavBar/UserInfo";
import LiveRoomCard from "../components/Rooms/LiveMatchRoomCard";
import { Grid, Button, Badge, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import ChangeProfilePicture from "../components/User/ChangeProfilePicture";
import ChangeCoverPhoto from "../components/User/ChangeCoverPhoto";

import axios from "axios";

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
  roomContainer: {
    padding: 24,
  },
});

function MyProfile() {
  const classes = useStyles();

  const history = useHistory();
  let config = {};

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (login_status.login) {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  } else {
    history.push("/login");
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [myProfileData, setMyProfileData] = useState(null);

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

  async function fetchData() {
    await getMyProfileData();
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
        <div>
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
          />
        </div>
      )}

      <Grid className={classes.roomContainer} sx={{ mt: 5 }}>
        <LiveRoomCard />
        <LiveRoomCard />
        <LiveRoomCard />
      </Grid>
    </div>
  );
}

export default MyProfile;
