import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notification from "./components/Notifications/Notification";
import Room from "./pages/VideoRoom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div> Welcome to Foot2gether </div>
        </Route>
        <Route exact path="/room">
          <Room />
        </Route>
        <Route exact path="/not">
          <Notification />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
