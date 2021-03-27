import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { News } from "./components/news";
import { Home } from "./components/home";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home setAuthenticated={setAuthenticated} />
        </Route>
        <Route path="/news">
          <News isAuthenticated={isAuthenticated} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
