import { useState, lazy, Suspense} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { News } from "./components/quizPage";
import { Home } from "./components/home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import AuthService from "./services/auth.service";


function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const Quiz = lazy(() => import('./components/quizPage/'));

  return (
    <Router>
      <Suspense fallback={<div>Loading... </div>}>
      <Switch>
        <Route path="/" exact>
          <Home setAuthenticated={setAuthenticated} />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/news" component={Quiz}>
          {/* <News isAuthenticated={isAuthenticated} /> */}
        </Route>
      </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
