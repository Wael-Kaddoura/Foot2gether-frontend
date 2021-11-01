import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminMainPage from "./pages/AdminPanel/AdminMainPage";
import AdminAllMatches from "./pages/AdminPanel/AdminAllMatches";
import AdminTodaysMatches from "./pages/AdminPanel/AdminTodaysMatches";
import AdminTodaysRooms from "./pages/AdminPanel/AdminTodaysRooms";
import Home from "./pages/UserPages/Home";
import Matches from "./pages/UserPages/Matches";
import Blog from "./pages/UserPages/Blogs";
import BlogView from "./pages/UserPages/BlogView";
import CreateBlog from "./pages/UserPages/CreateBlog";
import MatchRooms from "./pages/UserPages/MatchRooms";
import MyProfile from "./pages/UserPages/MyProfile";
import UserProfile from "./pages/UserPages/UserProfile";
import Rooms from "./pages/UserPages/Rooms";
import UserSearch from "./pages/UserPages/UserSearch";
import VideoRoom from "./pages/UserPages/VideoRoom";

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
        <Route exact path="/admin/home">
          <AdminMainPage />
        </Route>
        <Route exact path="/admin/all_matches">
          <AdminAllMatches />
        </Route>
        <Route exact path="/admin/todays_matches">
          <AdminTodaysMatches />
        </Route>
        <Route exact path="/admin/todays_rooms">
          <AdminTodaysRooms />
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
        <Route exact path="/blogs">
          <Blog />
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
        <Route exact path="/user_search">
          <UserSearch />
        </Route>
        <Route exact path="/blog_view">
          <BlogView />
        </Route>
        <Route exact path="/blog_view">
          <BlogView />
        </Route>
        <Route exact path="/create_blog">
          <CreateBlog />
        </Route>
        <Route exact path="/video_room">
          <VideoRoom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
