import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Custumer from './Pages/Customer';
import Login from './Pages/Login';
// import './App.css';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/login" component={ Login } />
          <Route path="/customer/products" component={ Custumer } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
