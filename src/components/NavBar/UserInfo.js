import { Grid, Typography, Badge } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChangeBio from "../User/ChangeBio";

const useStyles = makeStyles({
  followInfo: {
    color: "#fff !important",
    fontWeight: "700 !important",
    fontSize: "23px !important",
    textAlign: "center",
  },
  userBio: {
    color: "#fff !important",
    fontWeight: "400 !important",
    fontSize: "18px !important",
  },
});

function UserInfo(props) {
  const {
    followingCount,
    followersCount,
    bio,
    isMyProfile,
    getMyProfileData,
    changeBio,
  } = props;

  const classes = useStyles();

  return (
    <div className="hero-tertiary overlay">
      <div className="container">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 2 }}
        >
          <Grid
            item
            xs={12}
            md={4}
            container
            justifyContent="center"
            sx={{ mb: 1 }}
          >
            {isMyProfile ? (
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <ChangeBio
                    getMyProfileData={getMyProfileData}
                    changeBio={changeBio}
                  />
                }
                color="warning"
              >
                <Typography className={classes.userBio}>{bio}</Typography>
              </Badge>
            ) : (
              <Typography className={classes.userBio}>{bio}</Typography>
            )}
          </Grid>

          <Grid item xs={12} md={4} container>
            <Grid item xs={6}>
              <Typography className={classes.followInfo}>Followers</Typography>
              <Typography className={classes.followInfo}>
                {followersCount}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography className={classes.followInfo}>Following</Typography>
              <Typography className={classes.followInfo}>
                {followingCount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default UserInfo;
