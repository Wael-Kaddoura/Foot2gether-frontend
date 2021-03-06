import { useState } from "react";
import { Tabs, Tab, Typography, Box, Badge, useTheme } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import UpcomingMatchCard from "./MatchCards/UpcomingMatchCard";
import FinishedMatchCard from "./MatchCards/FinishedMatchCard";
import LiveMatchCard from "./MatchCards/LiveMatchCard";
import NoMatchMsg from "./NoMatchMsg";

const useStyles = makeStyles((theme) => ({
  tab: {
    [theme.breakpoints.between("xs", "sm")]: {
      minWidth: "135px !important",
      width: "135px !important",
    },
    [theme.breakpoints.between("sm", "md")]: {
      minWidth: "204px !important",
      width: "204px !important",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "380px !important",
      width: "380px !important",
    },
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

function MatchTabs(props) {
  const { liveMatches, upcomingMatches, finishedMatches } = props;

  const theme = useTheme();
  const classes = useStyles(theme);

  const [value, setValue] = useState(0);
  const [isLive, setIsLive] = useState(true);
  const [isUpcoming, setIsUpcoming] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function ActivateLive() {
    setIsLive(true);
    setIsUpcoming(false);
    setIsFinished(false);
  }

  function ActivateUpcoming() {
    setIsLive(false);
    setIsUpcoming(true);
    setIsFinished(false);
  }

  function ActivateFinished() {
    setIsLive(false);
    setIsUpcoming(false);
    setIsFinished(true);
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
            label={
              <div>
                <Typography sx={{ mr: 1.5 }} display="inline">
                  Live
                </Typography>
                <Badge
                  badgeContent={liveMatches.length}
                  color="error"
                  showZero
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                ></Badge>
              </div>
            }
            {...a11yProps(0)}
            style={
              isLive
                ? { fontWeight: "800", color: "#fff" }
                : { color: "#808080" }
            }
            onClick={ActivateLive}
            classes={{ root: classes.tab }}
          />
          <Tab
            label={
              <div>
                <Typography sx={{ mr: 1.5 }} display="inline">
                  Upcoming
                </Typography>
                <Badge
                  badgeContent={upcomingMatches.length}
                  color="error"
                  showZero
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                ></Badge>
              </div>
            }
            {...a11yProps(1)}
            style={
              isUpcoming
                ? { fontWeight: "800", color: "#fff" }
                : { color: "#808080" }
            }
            onClick={ActivateUpcoming}
            classes={{ root: classes.tab }}
          />
          <Tab
            label={
              <div>
                <Typography sx={{ mr: 1.5 }} display="inline">
                  Finished
                </Typography>
                <Badge
                  badgeContent={finishedMatches.length}
                  color="error"
                  showZero
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                ></Badge>
              </div>
            }
            {...a11yProps(2)}
            style={
              isFinished
                ? { fontWeight: "800", color: "#fff" }
                : { color: "#808080" }
            }
            onClick={ActivateFinished}
            classes={{ root: classes.tab }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {liveMatches.length ? (
          liveMatches.map((match) => (
            <LiveMatchCard
              key={match.id}
              matchID={match.id}
              team1Name={match.team1.name}
              team1Logo={match.team1.logo}
              team2Name={match.team2.name}
              team2Logo={match.team2.logo}
              stadium={match.stadium}
              league={match.competition.name}
              kickOff={match.kick_off}
            />
          ))
        ) : (
          <NoMatchMsg msg="There are no Live Matches right now!" />
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {upcomingMatches.length ? (
          upcomingMatches.map((match) => (
            <UpcomingMatchCard
              key={match.id}
              team1Name={match.team1.name}
              team1Logo={match.team1.logo}
              team2Name={match.team2.name}
              team2Logo={match.team2.logo}
              stadium={match.stadium}
              league={match.competition.name}
              matchDay={match.match_day}
              kickOff={match.kick_off}
            />
          ))
        ) : (
          <NoMatchMsg msg="There are no Upcoming Matches today!" />
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {finishedMatches.length ? (
          finishedMatches.map((match) => (
            <FinishedMatchCard
              key={match.id}
              team1Name={match.team1.name}
              team1Logo={match.team1.logo}
              team1Score={match.team1_score}
              team2Name={match.team2.name}
              team2Logo={match.team2.logo}
              team2Score={match.team2_score}
              stadium={match.stadium}
              league={match.competition.name}
            />
          ))
        ) : (
          <NoMatchMsg msg="There are no Finished Matches today!" />
        )}
      </TabPanel>
    </Box>
  );
}

export default MatchTabs;
