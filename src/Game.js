import { cloneDeep, sample } from 'lodash';
import SuperBoard from './SuperBoard.js';
import { emptySuperBoard, O, X } from './constants.js';
import { superWinner, winner } from './matrix_functions.js';
import React from 'react/addons';
import { RouteHandler } from 'react-router';

function getFocused(superBoard, lastMove) {
  if (
    !lastMove ||
    winner(superBoard[lastMove.rowIndex][lastMove.columnIndex])
  ) {
    return null;
  }
  return {
    superRowIndex: lastMove.rowIndex,
    superColumnIndex: lastMove.columnIndex,
  };
}

export default React.createClass({
  mixins: [ReactFireMixin],

  getInitialState() {
    return {
      activePlayer: sample([X, O]),
      game: emptySuperBoard(),
      lastMove: null,
    };
  },

  componentWillMount: function() {
    this.bindAsObject(new Firebase('https://sttt.firebaseio.com/game'), 'fireGame');
  },

  componentWillMount: function() {
    this.unbind('fireGame');
  },

  handleMove(superRowIndex, superColumnIndex, rowIndex, columnIndex) {
    this.state.game[superRowIndex][superColumnIndex][rowIndex][columnIndex] = this.state.activePlayer;
    this.setState({
      activePlayer: this.state.activePlayer === X ? O : X,
      game: this.state.game,
      lastMove: {superRowIndex, superColumnIndex, rowIndex, columnIndex},
    });
  },

  render() {
    if (superWinner(this.state.game)) {
      return (
        <h1>
          OMG
          {' '}
          <strong>{this.state.activePlayer === X ? O : X}</strong>
          {' '}
          WINS!
        </h1>
      );
    }
    return (
      <div>
        <p>Active player: {this.state.fireGame.activePlayer}</p>
        <SuperBoard
          focused={getFocused(this.state.game, this.state.lastMove)}
          onMove={this.handleMove}
          superBoard={this.state.game}
        />
      </div>
    );
  },
});

