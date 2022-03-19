import React from "react";

import { PublicRoute } from "./helperRoutes";
import { Switch,Redirect,Route } from 'react-router-dom';
import { LoginUser } from "../components/Login/LoginUser";
import { RegisterUser } from "../components/Login/RegisterUser";

import { PrivateRoute } from './helperRoutes';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Products } from '../components/home/Products';
import Message from '../components/Message';
import { isAuthenticated } from "../auth/authentications";
import HomeView from "../components/homeview/HomeView"
import Orders from "../components/detailsOrders/Orders"
import OrderDetail from "../components/detailsOrders/OrderDetail";
import {MainDashboard} from "../components/Dashboard/Main/MainDashboard";
import {Profile} from "../components/Profile/Profile";
import {Mainchat} from "../components/Chat/Mainchat";
import { isAuthenticatedRol } from "../auth/authenticationsRol";
const Routes = () => {
    const isAuth = isAuthenticated();
  const isAuthRol =isAuthenticatedRol();
  return (
    <>
    
    <Switch>
      <PublicRoute exact path="/" component={HomeView} />
      <PublicRoute exact path="/login" component={LoginUser} />
      <PublicRoute exact path="/register" component={RegisterUser} />
      <PrivateRoute path="/home" component={Products} />
      <PrivateRoute exact path='/notifications' component={Orders} />
      <PrivateRoute path="/notifications/order/:idorder" component={OrderDetail}/> 
      <PrivateRoute exact path="/message" component={Mainchat} />
      {isAuthRol&&
      <PrivateRoute  path="/maindashboard/dashboard/:topic" component={Dashboard} />
      }
      <PrivateRoute path="/maindashboard" component={MainDashboard} />
      <PrivateRoute path="/profile" component={Profile} />
      <Route
        path="*"
        render={() => {
          return <Redirect to={isAuth ?'/home':'/login'} />;
        }}
      />
    </Switch>
    </>
  );
};

export default Routes;
