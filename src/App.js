import React, { Component } from 'react';
import './App.css';
import Calculator from './Components/Calculator';

const style = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

class App extends Component {
  render() {
    return (
      <div style={style}>
        <Calculator />
      </div>
    );
  }
}

export default App;
