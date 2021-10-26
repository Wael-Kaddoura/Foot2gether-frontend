import { Grid, Typography, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";

import ChangeBio from "../User/ChangeBio";

const useStyles = makeStyles({
  followInfo: {
    color: "#fff !important",
    fontWeight: 700,
    fontSize: 23,
    textAlign: "center",
  },
  userBio: {
    color: "#fff",
    fontWeight: 400,
    fontSize: 18,
  },
});

function UserInfo(props) {
  const { followingCount, followersCount, bio, isMyProfile, getMyProfileData } =
    props;

  const classes = useStyles();

  return (
    <div className="hero-tertiary overlay">
      <div className="container">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={8} container justifyContent="center">
            {isMyProfile ? (
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={<ChangeBio getMyProfileData={getMyProfileData} />}
                color="warning"
              >
                <Typography className={classes.userBio}>{bio}</Typography>
              </Badge>
            ) : (
              <Typography className={classes.userBio}>{bio}</Typography>
            )}
          </Grid>

          <Grid item xs={6} md={2} sx={{ my: 2 }}>
            <Typography className={classes.followInfo}>Followers</Typography>
            <Typography className={classes.followInfo}>
              {followersCount}
            </Typography>
          </Grid>
          <Grid item xs={6} md={2} sx={{ my: 2 }}>
            <Typography className={classes.followInfo}>Following</Typography>
            <Typography className={classes.followInfo}>
              {followingCount}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default UserInfo;
