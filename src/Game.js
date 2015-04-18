import Board from './Board.js';
import { EMPTY_BOARD } from './constants.js';
import React from 'react/addons';
import { RouteHandler } from 'react-router';

console.log(EMPTY_BOARD)

export default React.createClass({

  render() {
    return (
      <div>
        <h2>This will be the game</h2>
        <Board board={EMPTY_BOARD} />
      </div>
    );
  }

});

