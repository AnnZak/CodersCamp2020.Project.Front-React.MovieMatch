import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.scss';
import Login from './views/Login/Login';
import Registration from './views/Registration/Registration'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
