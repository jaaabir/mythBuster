import { useState, lazy, Suspense } from "react";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AuthService from "./services/auth.service";
import { Navbar } from "./components/navbar";
import LeaderBoard from './components/leaderBoard'
import DataProvider from './context/dataProvider'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const Quiz = lazy(() => import("./components/quizPage/"));


  return (
    <>
      <DataProvider>
        <Router>
          <Navbar isAuthenticated={isAuthenticated} />
          <Suspense fallback={<div>Loading... </div>}>
            <Switch>
              <Route path="/" exact component={Login} />
                {/* <Home setAuthenticated={setAuthenticated} /> */}
              <Route exact path="/register" component={Register} />
              <Route path="/quiz" component={Quiz} />
              <Route path="/leaderboard" component={LeaderBoard} />
            </Switch>
          </Suspense>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
