import { useState, useEffect } from "react";
import { Card, Grid, Typography, Button, Badge, Avatar } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { styled } from "@mui/material/styles";

import { Link } from "react-router-dom";
import axios from "axios";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 45,
}));

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginLeft: "auto",
    marginRight: "auto",
  },
  roomName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: 700,
    textAlign: "center",
  },
  joinBtn: {
    color: "#fff",
    backgroundColor: "#ee1e46",
    borderColor: "#ee1e46",
    fontSize: 16,
    fontWeight: 700,
  },
  roomDetailsTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 300,
    textAlign: "center",
  },
  roomDetails: {
    color: "#fff",
    fontSize: 17,
    fontWeight: 300,
    textAlign: "center",
  },
  userImage: {
    [theme.breakpoints.between("xs", "sm")]: {
      height: 110,
      width: 110,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      height: 140,
      width: 140,
    },
  },
  teamLogo: {
    [theme.breakpoints.between("xs", "sm")]: {
      maxWidth: 30,
      maxHeight: 30,
    },
    [theme.breakpoints.between("sm", "xl")]: {
      maxWidth: 50,
      maxHeight: 50,
    },
  },
  userInfo: {
    color: "#fff",
    fontWeight: 700,
  },
}));

function UserCard(props) {
  const { userPP, userFavTeamLogo, username, followersCount } = props;

  const classes = useStyles();

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
          <Grid item xs={5} sm={3}>
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
          </Grid>

          <Grid item container xs={5} sm={5} className={classes.userInfo}>
            <Grid item xs={12}>
              {username}
            </Grid>
            <Grid item xs={12}>
              {followersCount} Followers
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default UserCard;
