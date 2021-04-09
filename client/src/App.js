import React, { Component,useMemo,useState,useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './pages/login';
import Home from './pages/home';
import Error from './pages/error';
import axios from 'axios';
import { AuthProvider } from "./context/AuthContext"

const App = () => {
  

  return (
    <BrowserRouter>
      <AuthProvider>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Error} />
      </Switch>
      </AuthProvider>
    </BrowserRouter>
    );  
};
//<Route path="/posts/:id" exact component={Post} />
export default App;