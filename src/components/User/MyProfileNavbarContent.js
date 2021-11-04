import { Grid, Badge, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

import ChangeProfilePicture from "./ChangeProfilePicture";
import ChangeCoverPhoto from "./ChangeCoverPhoto";

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
function MyProfileNavbarContent(props) {
  const {
    myProfileData,
    getMyProfileData,
    changeProfilePicture,
    changeCoverPhoto,
    username,
    userProfilePicture,
  } = props;
  const classes = useStyles();

  return (
    <Grid
      className={classes.userCover}
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
    >
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
                  src={userProfilePicture}
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

      <ChangeCoverPhoto
        getMyProfileData={getMyProfileData}
        changeCoverPhoto={changeCoverPhoto}
      />
    </Grid>
  );
}

export default MyProfileNavbarContent;
