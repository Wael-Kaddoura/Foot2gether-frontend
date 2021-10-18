import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Blog from "./pages/Blog";
import Standings from "./pages/Standings";

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
      </Switch>
    </Router>
  );
}

export default App;
