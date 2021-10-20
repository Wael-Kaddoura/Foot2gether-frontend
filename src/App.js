import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Blog from "./pages/Blog";
import Standings from "./pages/Standings";
import MatchRooms from "./pages/MatchRooms";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/matches">
          <Matches />
        </Route>
        <Route exact path="/blog">
          <Blog />
        </Route>
        <Route exact path="/standings">
          <Standings />
        </Route>
        <Route exact path="/match/rooms">
          <MatchRooms />
        </Route>
        <Route exact path="/userprofile">
          <UserProfile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
