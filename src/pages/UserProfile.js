import UserNavBar from "../components/NavBar/UserNavBar";
import userProfilePicture from "../Images/john doe.png";
import UserInfo from "../components/NavBar/UserInfo";
import { Grid, Button, Badge, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

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
    border: "5px solid",
    borderRadius: "50%",
    borderColor: "#fff",
  },
  favTeam: {
    height: 70,
    width: 70,
  },
  badge: {
    backgroundColor: "#fff",
    color: "#fff",
  },
});

function UserProfile() {
  const classes = useStyles();

  const NavBarContent = (
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
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                <img
                  src={"http://localhost:8000/logos/Manchester_United.png"}
                  className={classes.favTeam}
                  alt="userProfile"
                />
              }
            >
              <img
                src={userProfilePicture}
                className={classes.userImage}
                alt="userProfile"
              />
            </Badge>
          </Grid>

          <Grid item xs={12} md={5} sx={{ ml: 2, mt: 3 }}>
            <Typography className={classes.userName}>Bilal Azzam</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={4} sm={1} sx={{ mb: 8 }}>
        <Button className={classes.followBtn} variant="outlined" color="error">
          Follow
        </Button>
      </Grid>
    </Grid>
  );
  return (
    <div>
      <UserNavBar NavBarContent={NavBarContent} />
      <UserInfo />
    </div>
  );
}

export default UserProfile;
