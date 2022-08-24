import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Routes from './Routes';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Routes />
          <Route />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
