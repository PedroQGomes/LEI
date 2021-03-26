import React, { Component } from 'react';
import './App.css';
import Login from './pages/login';

class App extends Component {
  state = {
    response: {}
  };

  render() {
    return (
      <Login />
    );
  }
}

export default App;