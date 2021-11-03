import { useState, useEffect } from "react";
import { Grid, Badge, Typography, Avatar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";
import useAxiosFetch from "../../hooks/useAxiosFetch";

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
    fontSize: "30px !important",
    fontWeight: "800 !important",
    color: "#fff !important",
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

function MyProfile() {
  const classes = useStyles();
  const history = useHistory();

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push("/login");
  }

  const token = login_status.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  let user_data = JSON.parse(localStorage.getItem("login"));

  const { username, user_profile_picture, user_cover_photo, user_bio } =
    login_status;

  const [isPending, setIsPending] = useState(true);
  const [myProfileData, setMyProfileData] = useState(null);
  const [postError, setPostError] = useState(null);

  const { data: myLiveRooms, isPending: isRoomsPending } = useAxiosFetch(
    getAPIBaseURL() + "/room/my_rooms"
  );

  const { data: myBlogs, isPending: isBlogsPending } = useAxiosFetch(
    getAPIBaseURL() + "/blog/my_blogs"
  );

  async function getMyProfileData() {
    try {
      let response = await axios.get(
        getAPIBaseURL() + `/user/my_profile`,
        config
      );
      let my_profile_data = response.data;
      setMyProfileData(my_profile_data);
      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getMyProfileData();
  }, []);

  async function changeProfilePicture(formData) {
    setIsPending(true);
    try {
      const response = await axios.post(
        getAPIBaseURL() + "/user/change_profile_picture",
        formData,
        config
      );

      if (response.status === 200) {
        user_data.user_profile_picture = response.data;
        localStorage.setItem("login", JSON.stringify(user_data));

        getMyProfileData();
        setPostError(null);
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setPostError(err.message);
      setIsPending(false);
    }
  }

  async function changeCoverPhoto(formData) {
    setIsPending(true);
    try {
      const response = await axios.post(
        getAPIBaseURL() + "/user/change_cover_photo",
        formData,
        config
      );

      if (response.status === 200) {
        user_data.user_cover_photo = response.data;
        localStorage.setItem("login", JSON.stringify(user_data));

        getMyProfileData();
        setPostError(null);
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setPostError(err.message);
      setIsPending(false);
    }
  }

  async function changeBio(data) {
    setIsPending(true);
    try {
      let response = await axios.post(
        getAPIBaseURL() + "/user/change_bio",
        data,
        config
      );

      if (response.status === 200) {
        user_data.user_bio = response.data;
        localStorage.setItem("login", JSON.stringify(user_data));

        getMyProfileData();
        setPostError(null);
      } else {
        console.log("Something went wrong!");
      }
    } catch (err) {
      console.log(err);
      setPostError(err.message);
      setIsPending(false);
    }
  }

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
                    <ChangeProfilePicture
                      getMyProfileData={getMyProfileData}
                      changeProfilePicture={changeProfilePicture}
                    />
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

      <ChangeCoverPhoto
        getMyProfileData={getMyProfileData}
        changeCoverPhoto={changeCoverPhoto}
      />
    </Grid>
  );

  return (
    <div>
      <BackdropComponent open={isPending || isRoomsPending || isBlogsPending} />

      {postError && <Alert severity="error">{postError}</Alert>}

      {!isPending && !isRoomsPending && !isBlogsPending && (
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
            changeBio={changeBio}
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
