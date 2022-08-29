import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Admin from './Pages/Admin';
import Custumer from './Pages/Customer';
import Login from './Pages/Login';
import Seller from './Pages/Seller';
import Register from './Pages/Register';
// import Checkout from './Components/Checkout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={ Login } />
          <Route path="/customer/products" component={ Custumer } />
          <Route path="/seller/orders" component={ Seller } />
          <Route path="/admin/manage" component={ Admin } />
          <Route path="/register" component={ Register } />
          <Route path="/customer/checkout" component={ Custumer } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
