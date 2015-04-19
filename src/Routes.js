import App from './routes/App';
import Game from './Game';
import JoinGame from './JoinGame.js';
import NewGame from './NewGame';
import { DefaultRoute, Route } from 'react-router';
import React from 'react/addons';

module.exports = (
  <Route handler={App} name="app" path="/">
    <Route handler={Game} name="play_game" path="/:game_id" />
    <Route handler={JoinGame} name="join_game" path="/join/:game_id/:as_player" />
    <DefaultRoute handler={NewGame} name="new_game" />
  </Route>
);
