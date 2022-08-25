import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Admin from './Pages/Admin';
import Custumer from './Pages/Customer';
import Login from './Pages/Login';
import Seller from './Pages/Seller';
import Routes from './Routes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Routes />
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={ Login } />
          <Route path="/customer/products" component={ Custumer } />
          <Route path="/seller/orders" component={ Seller } />
          <Route path="/admin/manage" component={ Admin } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
