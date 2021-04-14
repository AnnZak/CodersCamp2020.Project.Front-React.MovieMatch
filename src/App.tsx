import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import './App.scss';
import PrivateRoute from './helpers/PrivateRoute/PrivateRoute';
import Login from './views/Login/Login';
import Registration from './views/Registration/Registration'
import ForgotPassword from './views/ForgotPassword/ForgotPassword';
import ResetPassword from './views/ResetPassword/ResetPassword';
import UserSettings from './views/UserSettings/UserSettings';
import MovieDetails from './views/MovieDetails/MovieDetails';
import Dashboard from './views/Dashboard/Dashboard';
import CheckEmail from './views/CheckEmail/CheckEmail';
import SearchFriends from './views/SearchFriends/SearchFriends';
import SearchMovies from './views/SearchMovies/SearchMovies';
import RegisterConfirm from './views/RegisterConfirm/RegisterConfirm';
import MovieCollection from './views/MovieCollection/MovieCollection';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/check-email" component={CheckEmail} /> {/*TODO: only accesible through registration beeing succesful*/}
          <Route exact path="/register-confirm/:resetToken" component={RegisterConfirm} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/settings" component={UserSettings} />
          <PrivateRoute exact path="/search-friends" component={SearchFriends} />
          <PrivateRoute exact path="/movies/:movieid" component={MovieDetails} />
          <PrivateRoute exact path="/movies" component={SearchMovies} />
          <PrivateRoute exact path="/collection/:userid" component={MovieCollection} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
