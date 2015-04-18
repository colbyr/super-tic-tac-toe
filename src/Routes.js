import App from './routes/App';
import Dashboard from './routes/Dashboard';
import { DefaultRoute, Route } from 'react-router';
import React from 'react/addons';

module.exports = (
  <Route handler={App} name="app" path="/">
    <DefaultRoute handler={Dashboard} />
  </Route>
);
