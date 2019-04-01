import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SalesChart from './Components/Charts/Sales';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="200" height="200" />
          <SalesChart />
        </header>
      </div>
    );
  }
}

export default App;
