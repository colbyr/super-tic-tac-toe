import App from './routes/App';
import Game from './Game';
import NewGame from './NewGame';
import { DefaultRoute, Route } from 'react-router';
import React from 'react/addons';

module.exports = (
  <Route handler={App} name="app" path="/">
    <Route handler={Game} name="play_game" path="/:game_id" />
    <DefaultRoute handler={NewGame} name="new_game" />
  </Route>
);
