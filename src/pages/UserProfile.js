import { useState, useEffect } from "react";
import UserNavBar from "../components/NavBar/UserNavBar";
import UserInfo from "../components/NavBar/UserInfo";
import LiveRoomCard from "../components/Rooms/LiveMatchRoomCard";
import { Grid, Button, Badge, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import axios from "axios";

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
  roomContainer: {
    padding: 24,
  },
});

function UserProfile() {
  const classes = useStyles();

  const user_id = new URLSearchParams(useLocation().search).get("id");

  const history = useHistory();
  let config = {};

  function loginStatusCheck() {
    let login_status = JSON.parse(localStorage.getItem("login"));
    if (login_status.login) {
      const token = login_status.token;
      config = { headers: { Authorization: `Bearer ${token}` } };
    } else {
      history.push("/login");
    }
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState(null);

  async function getUserData() {
    try {
      let response = await axios.get(
        `http://localhost:8000/user/` + user_id,
        config
      );
      let user_data = response.data;
      console.log(user_data);
      setUserData(user_data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchData() {
    loginStatusCheck();
    await getUserData();
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
        <Button className={classes.followBtn} variant="outlined" color="error">
          Follow
        </Button>
      </Grid>
    </Grid>
  );
  return (
    <div>
      {isLoaded && (
        <div>
          <UserNavBar
            NavBarContent={NavBarContent}
            dontShowProfileIcon={true}
            coverPhoto={userData.cover_photo}
          />
          <UserInfo
            followingCount={userData.following.length}
            followersCount={userData.follower.length}
            bio={userData.bio}
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

export default UserProfile;
