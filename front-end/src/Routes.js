import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './Pages/Register';

function Routes() {
  return (
    <Switch>
      <Route exact path="/register" component={ Register } />
    </Switch>
  );
}

export default Routes;
