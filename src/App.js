import React, { Component } from 'react';
import './App.css';
import Grid from './Grid.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1 className="app-title">Connect Four</h1>
        <Grid/>
      </div>
    );
  }
}

export default App;
