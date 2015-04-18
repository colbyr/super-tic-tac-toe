import App from './routes/App';
import Game from './Game';
import { DefaultRoute, Route } from 'react-router';
import React from 'react/addons';

module.exports = (
  <Route handler={App} name="app" path="/">
    <DefaultRoute handler={Game} />
  </Route>
);
