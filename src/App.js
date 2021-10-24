import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Blog from "./pages/Blogs";
import Standings from "./pages/Standings";
import MatchRooms from "./pages/MatchRooms";
import MyProfile from "./pages/MyProfile";
import UserProfile from "./pages/UserProfile";
import BlogView from "./pages/BlogView";
import Rooms from "./pages/Rooms";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/matches">
          <Matches />
        </Route>
        <Route exact path="/rooms">
          <Rooms />
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
        <Route exact path="/my_profile">
          <MyProfile />
        </Route>
        <Route exact path="/user_profile">
          <UserProfile />
        </Route>
        <Route exact path="/blogview">
          <BlogView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
