import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.scss';

import Login from './views/Login/Login';
import Registration from './views/Registration/Registration'
import Topbar from './components/layout/topbar/topbar';
import ForgotPassword from './views/ForgotPassword/ForgotPassword';
import ResetPassword from './views/ResetPassword/ResetPassword';
import UserSettings from './views/UserSettings/UserSettings';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/settings" component={UserSettings} />
          <Route exact path="/topbar-deme" component={Topbar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
