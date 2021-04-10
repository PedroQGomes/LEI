import React, { Component,useMemo,useState,useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './pages/login';
import Home from './pages/home';
import Error from './pages/error';
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "./routes/PrivateRoute"
import PublicRoute from './routes/PublicRoute';

const App = () => {
  

  return (
    <BrowserRouter>
      <AuthProvider>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PublicRoute path="/login" exact component={Login} />
        <Route path="/" component={Error} />
      </Switch>
      </AuthProvider>
    </BrowserRouter>
    );  
};
//<Route path="/posts/:id" exact component={Post} />
export default App;