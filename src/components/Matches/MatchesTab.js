import { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import UpcomingMatchCard from "./MatchCards/UpcomingMatchCard";
import FinishedMatchCard from "./MatchCards/FinishedMatchCard";
import LiveMatchCard from "./MatchCards/LiveMatchCard";

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

function MatchTabs() {
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          textColor="white"
          TabIndicatorProps={{ style: { backgroundColor: "#fff" } }}
        >
          <Tab
            label="Live"
            {...a11yProps(0)}
            style={
              isLive
                ? { fontWeight: "800", color: "#fff" }
                : { color: "#808080" }
            }
            onClick={ActivateLive}
          />
          <Tab
            label="Upcoming"
            {...a11yProps(1)}
            style={
              isUpcoming
                ? { fontWeight: "800", color: "#fff" }
                : { color: "#808080" }
            }
            onClick={ActivateUpcoming}
          />
          <Tab
            label="Finished"
            {...a11yProps(2)}
            style={
              isFinished
                ? { fontWeight: "800", color: "#fff" }
                : { color: "#808080" }
            }
            onClick={ActivateFinished}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LiveMatchCard />
        <LiveMatchCard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UpcomingMatchCard />
        <UpcomingMatchCard />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FinishedMatchCard />
        <FinishedMatchCard />
      </TabPanel>
    </Box>
  );
}

export default MatchTabs;
