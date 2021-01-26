import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import UserForm from '../pages/Users/Form';
import Products from '../pages/Products';
import ProductForm from '../pages/Products/Form';
import Clients from '../pages/Clients';
import ClientsForm from '../pages/Clients/Form';
import Orders from '../pages/Orders';
import OrdersForm from '../pages/Orders/Form';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />

    <Route path="/users" exact component={Users} isPrivate />
    <Route path="/users/add" exact component={UserForm} isPrivate />
    <Route path="/users/edit/:id" exact component={UserForm} isPrivate />

    <Route path="/products" exact component={Products} isPrivate />
    <Route path="/products/add" exact component={ProductForm} isPrivate />
    <Route path="/products/edit/:id" exact component={ProductForm} isPrivate />

    <Route path="/clients" exact component={Clients} isPrivate />
    <Route path="/clients/add" exact component={ClientsForm} isPrivate />
    <Route path="/clients/edit/:id" exact component={ClientsForm} isPrivate />

    <Route path="/orders" exact component={Orders} isPrivate />
    <Route path="/orders/add" exact component={OrdersForm} isPrivate />
    <Route path="/orders/edit/:id" exact component={OrdersForm} isPrivate />
  </Switch>
);

export default Routes;
