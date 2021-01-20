import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
// import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import UserForm from '../pages/Users/Form';
import Products from '../pages/Products';
import ProductForm from '../pages/Products/Form';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    {/* <Route path="/signup" exact component={SignUp} /> */}

    <Route path="/dashboard" exact component={Dashboard} isPrivate />

    <Route path="/users" exact component={Users} isPrivate />
    <Route path="/users/add" exact component={UserForm} isPrivate />

    <Route path="/products" exact component={Products} isPrivate />
    <Route path="/products/add" exact component={ProductForm} isPrivate />
    <Route path="/products/edit/:id" exact component={ProductForm} isPrivate />
  </Switch>
);

export default Routes;
