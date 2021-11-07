import { useState } from "react";
import { Card, Grid, Badge, Avatar, Button, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { useHistory, Link } from "react-router-dom";
import getAPIBaseURL from "../../APIBaseURL";
import axios from "axios";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 35,
  height: 40,
}));

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05) !important",
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  userImage: {
    [theme.breakpoints.between("xs", "sm")]: {
      height: "80px !important",
      width: "80px !important",
    },
    [theme.breakpoints.between("sm", "xl")]: {
      height: "140px !important",
      width: "140px !important",
    },
  },
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxWidth: 25,
      maxHeight: 25,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      maxWidth: 50,
      maxHeight: 50,
    },
  },
  userInfo: {
    color: "#fff !important",
    fontWeight: "700 !important",
  },
  unfollowBtn: {
    color: "#fff !important",
    backgroundColor: "#bf1737 !important",
    borderColor: "#bf1737 !important",
  },
}));

function UserCard(props) {
  const {
    userID,
    userPP,
    userFavTeamLogo,
    username,
    followersCount,
    is_followed,
  } = props;

  const classes = useStyles();
  const history = useHistory();

  let config = "";

  let login_status = JSON.parse(localStorage.getItem("login"));
  if (!login_status || !login_status.login) {
    history.push({
      pathname: "/login",
      state: {
        need_login_first: true,
      },
    });
  } else {
    const token = login_status.token;
    config = { headers: { Authorization: `Bearer ${token}` } };
  }

  const [isFollowed, setIsFollowed] = useState(is_followed);

  async function followUser() {
    try {
      await axios.post(
        getAPIBaseURL() + `/user/follow`,
        { followed_user_id: userID },
        config
      );

      setIsFollowed(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function unFollowUser() {
    try {
      await axios.post(
        getAPIBaseURL() + `/user/unfollow`,
        { unfollowed_user_id: userID },
        config
      );

      setIsFollowed(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid item xs={12} sx={{ mb: 5, mx: 2 }}>
      <Card
        className={classes.card}
        sx={{ maxWidth: 800, minHeight: 176, maxHeight: 176, mx: 2 }}
      >
        <Grid
          sx={{ minHeight: 176 }}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={3} sm={3}>
            <Link to={"/user_profile?id=" + userID}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <SmallAvatar alt="user_fav_team" src={userFavTeamLogo} />
                }
              >
                <Avatar
                  alt="user_profile_picture"
                  src={userPP}
                  className={classes.userImage}
                />
              </Badge>
            </Link>
          </Grid>

          <Grid item container xs={5} sm={5}>
            <Grid item xs={12}>
              <Link to={"/user_profile?id=" + userID}>
                <Typography className={classes.userInfo}>{username}</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} className={classes.userInfo}>
              {followersCount} Followers
            </Grid>
          </Grid>

          <Grid item container xs={3} sm={3}>
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
      </Card>
    </Grid>
  );
}

export default UserCard;
