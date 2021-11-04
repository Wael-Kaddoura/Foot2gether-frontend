import { Grid, Button, Badge, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 55,
  height: 65,
}));

const useStyles = makeStyles({
  unfollowBtn: {
    color: "#fff !important",
    backgroundColor: "#bf1737 !important",
    borderColor: "#bf1737 !important",
  },
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
});

function UserProfileNavbarContent(props) {
  const { userData, isFollowed, followUser, unFollowUser } = props;
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
                <SmallAvatar alt="user_fav_team" src={userData.fav_team.logo} />
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
}

export default UserProfileNavbarContent;
