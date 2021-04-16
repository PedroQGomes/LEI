import React, { Component,useMemo,useState,useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Products from './pages/products';
import Error from './pages/error';
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./routes/PrivateRoute"
import PublicRoute from './routes/PublicRoute';


import SideBar from './components/SideBar/SideBar';

const DashboardStruct = ({match}) => {
  return(
    <BrowserRouter>
    <SideBar />
    <Switch>
      <Route path={match.url} exact={true} component={Dashboard} />
      <Route path={`${match.url}/products`} exact={true} component={Products} />
    </Switch>
    </BrowserRouter>
  );
};



const App = () => {
  

  return (
    <BrowserRouter>
      <AuthProvider>
      <Switch>
        <PublicRoute path="/" exact component={Home} />
        <PublicRoute path="/login" exact component={Login} />
        <PrivateRoute path='/dashboard' component={DashboardStruct} />
        <Route path="/" component={Error} />
      </Switch>
      </AuthProvider>
    </BrowserRouter>
    );  
};
//<Route path="/posts/:id" exact component={Post} />
export default App;