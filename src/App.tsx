import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.scss';
import PrivateRoute from './helpers/PrivateRoute';

import Login from './views/Login/Login';
import Registration from './views/Registration/Registration'
import Topbar from './components/layout/topbar/topbar';
import ForgotPassword from './views/ForgotPassword/ForgotPassword';
import ResetPassword from './views/ResetPassword/ResetPassword';
import UserSettings from './views/UserSettings/UserSettings';
import MovieDetails from './views/MovieDetails/MovieDetails';
import Dashboard from './views/Dashboard/Dashboard';
import CheckEmail from './views/CheckEmail/CheckEmail';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/settings" component={UserSettings} />
          <PrivateRoute exact path="/movie-demo" component={MovieDetails} />
          <Route exact path="/topbar-demo" component={Topbar} />
          <Route exact path="/check-email" component={CheckEmail} /> {/*TODO: only accesible through registration beeing succesful*/}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
