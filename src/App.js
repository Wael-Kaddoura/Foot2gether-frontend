import VideoRoom from "./pages/VideoRoom";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <VideoRoom />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
