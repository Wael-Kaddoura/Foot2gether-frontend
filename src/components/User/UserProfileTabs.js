import { useState } from "react";
import { Tabs, Tab, Typography, Box, useTheme, Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import LiveRoomCard from "../Rooms/LiveRoomCard";
import BlogCard from "../Blogs/BlogCard";
import NoContentMsg from "./NoContentMsg";

const useStyles = makeStyles((theme) => ({
  tab: {
    [theme.breakpoints.between("xs", "sm")]: {
      minWidth: 135,
      width: 135,
    },
    [theme.breakpoints.between("sm", "md")]: {
      minWidth: 204,
      width: 204,
    },
    [theme.breakpoints.up("md")]: {
      minWidth: 380,
      width: 380,
    },
  },
  blogsContainer: {
    paddingRight: "5em",
    paddingLeft: "5em",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function UserProfileTabs(props) {
  const { username, userLiveRooms, userBlogs } = props;

  const theme = useTheme();
  const classes = useStyles(theme);

  const [value, setValue] = useState(0);
  const [isLiveRooms, setIsLiveRooms] = useState(true);
  const [isBlogs, setIsBlogs] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function ActivateLive() {
    setIsLiveRooms(true);
    setIsBlogs(false);
  }

  function ActivateUpcoming() {
    setIsLiveRooms(false);
    setIsBlogs(true);
  }

  return (
    <Box sx={{ width: "100%" }} style={{ backgroundColor: "#1a1e25 " }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          TabIndicatorProps={{ style: { backgroundColor: "#fff" } }}
        >
          <Tab
            label="Live Rooms"
            {...a11yProps(0)}
            style={
              isLiveRooms
                ? { fontWeight: "800", color: "#fff" }
                : { color: "#808080" }
            }
            onClick={ActivateLive}
            classes={{ root: classes.tab }}
          />
          <Tab
            label="Blogs"
            {...a11yProps(1)}
            style={
              isBlogs
                ? { fontWeight: "800", color: "#fff" }
                : { color: "#808080" }
            }
            onClick={ActivateUpcoming}
            classes={{ root: classes.tab }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {userLiveRooms.length ? (
          userLiveRooms.map((room) => (
            <LiveRoomCard
              key={room.id}
              roomName={room.name}
              roomID={room.id}
              roomCreator={room.creator.username}
              roomCreatorID={room.creator_id}
              roomCurrentCapacity={room.current_participants_number}
              team1Logo={room.matchroom.team1.logo}
              team2Logo={room.matchroom.team2.logo}
            />
          ))
        ) : (
          <NoContentMsg msg={username + " has no Live Rooms right now!"} />
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid
          className={classes.blogsContainer}
          container
          direction="row"
          justifyContent="space-around"
          alignItems="flex-end"
          sx={{ pt: 10 }}
          style={{ backgroundColor: "#1a1e25 " }}
        >
          {userBlogs.length ? (
            userBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blogID={blog.id}
                blogImg={blog.image}
                blogTitle={blog.title}
                blogBody={blog.body}
                blogDate={blog.updatedAt}
              />
            ))
          ) : (
            <NoContentMsg msg={username + " did not post any blogs yet!"} />
          )}
        </Grid>
      </TabPanel>
    </Box>
  );
}

export default UserProfileTabs;
