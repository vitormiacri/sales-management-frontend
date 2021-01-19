import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
// import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import UserForm from '../pages/Users/Form';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    {/* <Route path="/signup" exact component={SignUp} /> */}

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/users" exact component={Users} isPrivate />
    <Route path="/users/add" exact component={UserForm} isPrivate />
  </Switch>
);

export default Routes;
