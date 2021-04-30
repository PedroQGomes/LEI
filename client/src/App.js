import React, { Component,useMemo,useState,useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Error from './pages/error';
import Profile from './pages/profile';
import contact_us from './pages/contact-us';
import searchRef from './pages/searchRef';
import searchName from './pages/searchName';
import searchCategory from './pages/searchCategory';
import inventory from './pages/inventory';
import orders from './pages/orders';
import settings from './pages/settings';
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./routes/PrivateRoute"
import PublicRoute from './routes/PublicRoute';
import ItemPage from './pages/item';

import Navbar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';






const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
      <Switch>
        <PublicRoute path="/" exact component={Home} />
        <PublicRoute path="/login" exact component={Login} />
        <div>
            <Navbar />
            <div className="side-nav-and-content-wrapper">
            <SideBar />
              <Switch>
                <PrivateRoute path='/dashboard' exact={true} component={Dashboard} />
                <PrivateRoute path='/profile' exact={true} component={Profile} />
                <PrivateRoute path='/contact-us' exact={true} component={contact_us} />
                <PrivateRoute path='/search/ref' exact={true} component={searchRef} />
                <PrivateRoute path='/search/name' exact={true} component={searchName} />
                <PrivateRoute path='/search/category' exact={true} component={searchCategory} />
                <PrivateRoute path='/inventory' exact={true} component={inventory} />
                <PrivateRoute path='/orders' exact={true} component={orders} />
                <PrivateRoute path='/settings' exact={true} component={settings} />
                <PrivateRoute path="/item/:id" exact component={ItemPage} />
              </Switch>
            </div>
        </div>
        <Route path="/" component={Error} />
      </Switch>
      </AuthProvider>
    </BrowserRouter>
    );  
};
//<Route path="/posts/:id" exact component={Post} />
export default App;