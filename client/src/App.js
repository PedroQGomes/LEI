import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Login from './pages/login';
import Home from './pages/home';
import Error from './pages/error'

const App = () => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Error} />
      </Switch>
    </BrowserRouter>
    );  
};
//<Route path="/posts/:id" exact component={Post} />
export default App;