import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Child from './components/Child'

const data = {
  car: {
    make: 'BMW',
    model: 'Civic',
    color: 'red'
  }
}

class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Poop</h1>
          <Child poop={data.car} poop2={data.car.model}/>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

      </div>
    );
  }
}

export default App;
