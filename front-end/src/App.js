import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Admin from './Pages/Admin';
import Custumer from './Pages/Customer';
import Login from './Pages/Login';
import Seller from './Pages/Seller';
import Register from './Pages/Register';
import OrderCustumerDetails from './Pages/OrderCustumerDetails';
import Orders from './Pages/Orders';
import OrderSellerDetails from './Pages/OrderSellerDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={ Login } />
          <Route path="/customer/products" component={ Custumer } />
          <Route path="/seller/orders" exact component={ Seller } />
          <Route path="/seller/orders/:id" component={ OrderSellerDetails } />
          <Route path="/admin/manage" component={ Admin } />
          <Route path="/register" component={ Register } />
          <Route path="/customer/orders" component={ Orders } />
          <Route path="/customer/checkout" component={ Custumer } />
          <Route path="/customer/orders/:id" component={ OrderCustumerDetails } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
